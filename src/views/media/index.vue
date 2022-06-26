<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import type { MediaModel } from '@/services/media'
import { getMedias } from '@/services/media'
import { useRouter, useRoute } from 'vue-router'
import { _deleteModal, _loading, _toast, OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'
const route = useRoute()
const router = useRouter()
const MediaItem = defineAsyncComponent(() =>
  import('./MediaItem.vue')
);

const items = ref<{isLoading: boolean, count: number, list: MediaModel[]}>({
    isLoading: false,
    count: 0,
    list: []
})

async function changeQuery(param: { key: string, value:number|string }) {
    const query = {
        ...route.query
    }
    query[param.key] = String(param.value)
    await router.replace({ query })
    getItems()
}
const searchInput = ref('')
async function getItems() {
    const { offset = 0, lang = 'uz' } = route.query
    OPEN_LOADING_MODAL()
    const [error, response] = await getMedias(searchInput.value, Number(offset), 1, String(lang))
    CLOSE_LOADING_MODAL()
    items.value.count = response.count
    items.value.list = response.list
    console.log(response.list)
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
      <router-link :to="{path: '/media'}" class="bg-orange-primary shadow-lg shadow-black-primary-500/50 flex items-center text-white-primary flex px-5.5 py-3 rounded" role="button" @click="">
        <i class="ri-add-line"></i>
        <p class="text-sm px-2">Yangi media blog qo‘shish</p>
      </router-link>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-3.5">
    <media-item v-for="item in items.list" :key="item.id" :id="Number(item.id)" :lang="item.lang" :slug="item.slug" :isMain="item.isMain" :title="item.title" :description="item.description" :image="item.image" :type="item.type" :author="item.author" :credit="item.credit" :active="item.active" :deleted="item.deleted" :date="Number(item.date)" :category="item.category" :isTop="item.isTop" :body="item.body" :seoTitle="item.seoTitle" :seoMeta="item.seoMeta" :seoDesc="item.seoDesc" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, media blogni o‘chirishga aminmisiz?', title: `${item.title}`, url: 'article', callback: getItems })"/>
  </div>
  <base-pagination :active="Math.trunc(Number(route.query.offset)/6) + 1 || 1" :perPage="6" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*6})"/>
  <the-modal ref="modalRef" @submit="OPEN_LOADING_MODAL" @toast="(val: any) => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
</div>
</template>
