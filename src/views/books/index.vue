<script setup lang="ts">
import { getBooks } from '@/services/books'
import { defineAsyncComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { BookModel } from '@/services/books'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION } from '@/store'

const route = useRoute()
const router = useRouter()
const searchInput = ref('')
const BookItem = defineAsyncComponent(() => import('./BookItem.vue'));

const items = ref<{ isLoading: boolean, count: number, list: BookModel[] }>({
  isLoading: false,
  count: 0,
  list: []
})

async function changeQuery(param: { key: string, value: number | string }) {
  const query = {
    ...route.query
  }
  query[param.key] = String(param.value)
  await router.replace({ query })
  getItems()
}

async function getItems() {
  const { offset = 0, lang = 'uz' } = route.query
  OPEN_LOADING_MODAL()
  const [error, response] = await getBooks(searchInput.value, Number(offset), String(lang))
  CLOSE_LOADING_MODAL()
  items.value.count = response.count
  items.value.list = response.list
  
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
          <router-link :to="{path: '/book'}" class="bg-orange-primary shadow-lg shadow-black-primary-500/50 items-center text-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded" role="button">
            <i class="ri-add-line"></i>
            <p class="text-sm px-2 whitespace-nowrap flex items-center gap-1.5"><span class="hidden lg:block">Yangi kitob</span> qo‘shish</p>
          </router-link>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        <book-item v-for="item in items.list" :key="item.id" :id="Number(item.id)" :lang="item.lang" :slug="item.slug" :name="item.name" :title="item.title" :description="item.description" :image="item.image" :url="item.url" :bookAuthor="item.bookAuthor" :category="item.category" :isActive="item.isActive" :isDeleted="item.isDeleted" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, kitobni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'book', callback: getItems })"/>
      </div>

      <base-pagination v-if="items.count > 8" :active="Math.trunc(Number(route.query.offset)/8) + 1 || 1" :perPage="8" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*8})"/>
    </div>
    
    <base-loading />
  </div>
</template>
