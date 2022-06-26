<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import type { TagModel } from '@/services/tags'
import { getTags } from '@/services/tags'
import { useRouter, useRoute } from 'vue-router'
import { _deleteModal, _loading, _toast, OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'
const route = useRoute()
const router = useRouter()
const CategoryItem = defineAsyncComponent(() =>
  import('./TagItem.vue')
);
const TheModal = defineAsyncComponent(() =>
  import('./TheModal.vue')
)
const items = ref<{isLoading: boolean, count: number, list: TagModel[]}>({
    isLoading: false,
    count: 0,
    list: []
})

async function changeQuery(param: { key: string, value:number | string }) {
    const query = {
        ...route.query
    }
    query[param.key] = String(param.value)
    await router.replace({ query })
    getItems()
}
const modalRef = ref()
const searchInput = ref('')
async function getItems() {
    const { lang = 'uz', offset = 0 } = route.query
    OPEN_LOADING_MODAL()
    const [error, response] = await getTags(String(lang), searchInput.value, Number(offset))
  CLOSE_LOADING_MODAL()
  if (response.list) {
      items.value.count = response.count
    items.value.list = response.list
    }
}

function openModal(val: any) {
  modalRef.value.open(val)
}
getItems()
</script>
<template>
<div class="main bg-gray-primary px-8 md:px-12 lg:px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
  <div class="flex justify-between h-28 items-center">
    <div class="bg-white-primary rounded-3xl">
      <button class="text-sm px-6 py-3.5 rounded-3xl" :class="[route.query.lang !== 'eng' ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'lang', value: 'uz'})">O'zbek tilida</button>
      <button class="text-sm px-6 py-3.5 rounded-3xl" :class="[route.query.lang === 'eng'  ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'lang', value: 'eng'})">Ingliz tilida</button>
    </div>
    <div class="flex">
      <div class="bg-white-primary flex px-5.5 py-3 rounded w-52 mx-8" role="button">
        <i class="ri-search-line text-black-secondary"></i>
        <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
      </div>
      <button class="bg-orange-primary shadow-lg shadow-black-primary-500/50 flex items-center text-white-primary flex px-5.5 py-3 rounded" role="button" @click="openModal">
        <i class="ri-add-line"></i>
        <p class="text-sm px-2">Yangi teg qo‘shish</p>
      </button>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-8">
    <div>
      <table class="bg-white-primary">
    <thead>
      <th>Nomi</th>
      <th>Ishlatilganligi</th>
      <th>Amal</th>
    </thead>
    <tbody>
      <category-item v-for="item in items.list.slice(0, 5)" :id="Number(item.id)" :lang="item.lang" :articleCount="Number(item.articleCount)" :name="item.name"   :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, tegni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'tag', callback: getItems })"/>
    </tbody>
  </table>
  </div>
  <div>
    <table class="bg-white-primary" v-if="items.list.length > 5">
    <thead>
      <th>Nomi</th>
      <th>Ishlatilganligi</th>
      <th>Amal</th>
    </thead>
    <tbody>
      <category-item v-for="item in items.list.slice(5, 10)" :id="Number(item.id)" :lang="item.lang" :articleCount="Number(item.articleCount)" :name="item.name"   :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, tegni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'tag', callback: getItems })"/>
    </tbody>
  </table>
  </div>
  </div>
  <base-pagination :active="Math.trunc(Number(route.query.offset)/10) + 1 || 1" :perPage="10" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*10})"/>
  <the-modal ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
</div>
</template>