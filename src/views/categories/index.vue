<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCategories } from '@/services/categories'
import type { Category } from '@/services/categories'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const route = useRoute()
const router = useRouter()
const searchInput = ref('')

const TheModal = defineAsyncComponent( () => import('./TheModal.vue') );
const CategoryItem = defineAsyncComponent( () => import('./CategoryItem.vue') );


const items = ref<{isLoading: boolean, count: number, list: Category[]}>({
  isLoading: false,
  count: 0,
  list: []
})



function openModal(val: any) {
  modalRef.value.open(val)
}

async function changeQuery(param: { key: string, value:number|string }) {
  const query = {
      ...route.query
  }
  query[param.key] = String(param.value)
  await router.replace({ query })
  getItems()
}

async function getItems() {
  const { type = 1, offset = 0, lang = 'uz' } = route.query
  OPEN_LOADING_MODAL()
  const [error, response] = await getCategories(Number(type), searchInput.value, Number(offset), String(lang))
  CLOSE_LOADING_MODAL()
  items.value.count = response.count
  items.value.list = response.list
}

getItems()
</script>


<template>
  <div>
    <div class="main bg-gray-primary px-8 md:px-10 lg:px-12 right-0 fixed top-0 bottom-0 overflow-y-scroll">
      <div class="flex justify-between items-center flex-wrap gap-5 mb-10">
        <div class="flex items-center bg-white-primary rounded-3xl">
          <p class="text-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-3xl whitespace-nowrap flex items-center gap-1.5" :class="[route.query.lang !== 'eng' ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'lang', value: 'uz'})">O'zbek <span class="hidden xl:block">tilida</span></p>
          <p class="text-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-3xl whitespace-nowrap flex items-center gap-1.5" :class="[route.query.lang === 'eng'  ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'lang', value: 'eng'})">Ingliz <span class="hidden xl:block">tilida</span></p>
        </div>

        <div class="flex items-center bg-white-primary rounded-3xl">
          <p class="text-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-3xl whitespace-nowrap flex items-center gap-1.5" :class="[route.query.type !== '2' ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'type', value: 1})">Media</p>
          <p class="text-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-3xl whitespace-nowrap flex items-center gap-1.5" :class="[route.query.type === '2' ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'type', value: 2})">Ta'lim</p>
          <!-- <button class="text-sm px-6 py-3.5 rounded-3xl" :class="[route.query.type === '3'  ? 'bg-orange-primary text-white-primary': '']" @click="changeQuery({key: 'type', value: 3})">Media loyiha</button> -->
        </div>

        <div class="w-full lg:w-auto flex items-center justify-between">
          <div class="bg-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded w-52 mr-8" role="button">
            <i class="ri-search-line text-black-secondary"></i>
            <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
          </div>
          <button class="bg-orange-primary shadow-lg shadow-black-primary-500/50 flex items-center text-white-primary px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded" role="button" @click="openModal">
            <i class="ri-add-line"></i>
            <p class="text-sm px-2 whitespace-nowrap flex items-center gap-1.5"><span class="hidden lg:block">Yangi kategoriya</span> qo‘shish</p>
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        <category-item v-for="item in items.list" :id="Number(item.id)" :lang="item.lang" :articleCount="item.articleCount" :name="item.name" :type="item.type" :image="item.image" :slug="item.slug" :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, kategoriyani o‘chirishga aminmisiz?', title: `${item.name}`, url: 'category', callback: getItems })"/>
      </div>

      <base-pagination v-if="items.count > 12" :active="Math.trunc(Number(route.query.offset)/12) + 1 || 1" :perPage="12" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*12})"/>
      <the-modal ref="modalRef" @submit="OPEN_LOADING_MODAL" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
    </div>

    <base-loading />
  </div>
</template>
