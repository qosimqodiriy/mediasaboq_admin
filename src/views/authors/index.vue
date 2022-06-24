<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import type { AuthorModel } from '@/services/authors'
import { getAuthors } from '@/services/authors'
import { useRouter, useRoute } from 'vue-router'
import { _deleteModal, _loading, _toast, OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'
const route = useRoute()
const router = useRouter()
const AuthorItem = defineAsyncComponent(() =>
  import('./AuthorItem.vue')
);
const TheModal = defineAsyncComponent(() =>
  import('./TheModal.vue')
)
const items = ref<{isLoading: boolean, count: number, list: AuthorModel[]}>({
    isLoading: false,
    count: 0,
    list: []
})

async function changeQuery(param: { key: string, value:number }) {
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
    const { offset = 0 } = route.query
    OPEN_LOADING_MODAL()
    const [error, response] = await getAuthors(searchInput.value, Number(offset))
    CLOSE_LOADING_MODAL()
    items.value.count = response.count
    items.value.list = response.list
    console.log(response.list)
}

function openModal(val: any) {
  modalRef.value.open(val)
}
getItems()
</script>
<template>
<div class="main bg-gray-primary px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
  <div class="flex justify-between h-28 items-center">
    <p class="text-black-primary text-2xl font-bold">Mualliflar</p>
    <div class="flex">
      <div class="bg-white-primary flex px-5.5 py-3 rounded w-52 mx-8" role="button">
        <i class="ri-search-line text-black-secondary"></i>
        <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
      </div>
      <button class="bg-orange-primary shadow-lg shadow-black-primary-500/50 flex items-center text-white-primary flex px-5.5 py-3 rounded" role="button" @click="openModal">
        <i class="ri-add-line"></i>
        <p class="text-sm px-2">Yangi maullif qo‘shish</p>
      </button>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-8">
    <div>
      <table class="bg-white-primary">
    <thead>
      <th>ID</th>
      <th>Ismi sharifi</th>
      <th>Foydalanuvchi nomi</th>
      <th>Amal</th>
    </thead>
    <tbody>
      <author-item v-for="item in items.list.slice(0, 5)" :id="Number(item.id)" :username="item.username" :token="item.token" :uuid="item.uuid" :password="item.password" :name="item.name" :isActive="item.isActive" :image="item.image" :description="item.description"  :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, muallifni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'author', callback: getItems })"/>
    </tbody>
  </table>
    </div>
    <div>
        <table class="bg-white-primary" v-if="items.list.length > 5">
    <thead>
      <th>ID</th>
      <th>Ismi sharifi</th>
      <th>Foydalanuvchi nomi</th>
      <th>Amal</th>
    </thead>
    <tbody>
      <author-item v-for="item in items.list.slice(5, 10)" :id="Number(item.id)" :name="item.name" :username="item.username" :token="item.token" :uuid="item.uuid" :password="item.password" :isActive="item.isActive" :description="item.description" :image="item.image"  :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, muallifni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'author', callback: getItems })"/>
    </tbody>
  </table>
    </div>
  </div>
  <base-pagination :active="Math.trunc(Number(route.query.offset)/12) + 1 || 1" :perPage="12" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*12})"/>
  <the-modal ref="modalRef" @submit="OPEN_LOADING_MODAL" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
</div>
</template>
