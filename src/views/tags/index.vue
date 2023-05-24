<script setup lang="ts">
import { getTags } from '@/services/tags'
import { defineAsyncComponent, ref } from 'vue'
import type { TagModel } from '@/services/tags'
import { useRouter, useRoute } from 'vue-router'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const route = useRoute()
const router = useRouter()
const searchInput = ref('')

const TheModal = defineAsyncComponent( () => import('./TheModal.vue') );
const CategoryItem = defineAsyncComponent( () => import('./TagItem.vue') );

const items = ref<{isLoading: boolean, count: number, list: TagModel[]}>({
  isLoading: false,
  count: 0,
  list: []
})

function openModal(val: any) {
  modalRef.value.open(val)
}

async function changeQuery(param: { key: string, value:number | string }) {
  const query = {
    ...route.query
  }
  query[param.key] = String(param.value)
  await router.replace({ query })
  getItems()
}

async function getItems() {
  const { lang = 'uz', offset = 0 } = route.query
  OPEN_LOADING_MODAL()
  const [error, response] = await getTags(String(lang), searchInput.value, Number(offset))
  console.log(response.list);
  
  CLOSE_LOADING_MODAL()
  if (response.list) {
    items.value.list = response.list
    items.value.count = response.count
  }
}


getItems()
</script>

<template>
  <div>
    <div class="main bg-gray-primary px-8 md:px-10 lg:px-12 right-0 fixed top-0 bottom-0 overflow-y-scroll">
      <div class="flex justify-between items-center mb-10">
        <div class="flex items-center bg-white-primary rounded-3xl">
          <p class="text-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-3xl whitespace-nowrap flex items-center gap-1.5" :class="[route.query.lang !== 'eng' ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'lang', value: 'uz'})">O'zbek <span class="hidden lg:block">tilida</span></p>
          <p class="text-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-3xl whitespace-nowrap flex items-center gap-1.5" :class="[route.query.lang === 'eng'  ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'lang', value: 'eng'})">Ingliz <span class="hidden lg:block">tilida</span></p>
        </div>
        <div class="flex items-center">
          <div class="bg-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded w-52 mx-8" role="button">
            <i class="ri-search-line text-black-secondary"></i>
            <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
          </div>
          <button class="bg-orange-primary shadow-lg shadow-black-primary-500/50 items-center text-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded" role="button" @click="openModal">
            <i class="ri-add-line"></i>
            <p class="text-sm px-2 whitespace-nowrap flex items-center gap-1.5"><span class="hidden lg:block">Yangi teg</span> qo‘shish</p>
          </button>
        </div>
      </div>
      <div class="grid xl:grid-cols-2 gap-x-8">
        <div class="block xl:hidden">
          <table class="bg-white-primary">
            <thead>
              <th>Nomi</th>
              <th>Ishlatilganligi</th>
              <th>Amal</th>
            </thead>
            <tbody >
              <category-item v-for="item in items.list" :id="Number(item.id)" :lang="item.lang" :articleCount="Number(item.articleCount)" :name="item.name"   :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, tegni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'tag', callback: getItems })"/>
            </tbody>
          </table>
        </div>
        <div class="hidden xl:block">
          <table class="bg-white-primary">
            <thead>
              <th>Nomi</th>
              <th>Ishlatilganligi</th>
              <th>Amal</th>
            </thead>
            <tbody >
              <category-item v-for="item in items.list.slice(0, 5)" :id="Number(item.id)" :lang="item.lang" :articleCount="Number(item.articleCount)" :name="item.name"   :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, tegni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'tag', callback: getItems })"/>
            </tbody>
          </table>
        </div>
        <div class="hidden xl:block">
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


      <base-pagination v-if="items.count > 10" :active="Math.trunc(Number(route.query.offset)/10) + 1 || 1" :perPage="10" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*10})"/>
      <the-modal ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
    </div>


    <base-loading />
  </div>
</template>