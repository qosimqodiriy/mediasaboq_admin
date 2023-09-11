<script setup lang="ts">
import { getSocials } from '@/services/social'
import { defineAsyncComponent, ref } from 'vue'
import type { Social } from '@/services/social'
import { useRouter, useRoute } from 'vue-router'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const route = useRoute()
const router = useRouter()
const searchInput = ref('')

const TheModal = defineAsyncComponent( () => import('./TheModal.vue') )
const SocialItem = defineAsyncComponent( () => import('./SocialItem.vue') );

const items = ref<{isLoading: boolean, list: Social[]}>({
  isLoading: false,
  list: []
})

function openModal(val: any) {
  modalRef.value.open(val)
}

async function getItems() {
  OPEN_LOADING_MODAL()
  const [error, response] = await getSocials(searchInput.value)
  CLOSE_LOADING_MODAL()
  items.value.list = response
}



getItems()
</script>


<template>
  <div>
    <div class="main bg-gray-primary px-8 md:px-10 lg:px-12 right-0 fixed top-0 bottom-0 overflow-y-scroll">
      <div class="flex justify-between items-center mb-10">
        <p class="text-black-primary text-2xl font-bold">Ijtimoiy tarmoqlar</p>
        <div class="flex">
          <div class="bg-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded w-52 mx-8" role="button">
            <i class="icon-search" />
            <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
          </div>
          <button class="bg-orange-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded shadow-lg shadow-black-primary-500/50 text-white-primary" role="button" @click="openModal">
            <i class="ri-add-line"></i>
            <p class="text-sm px-2 whitespace-nowrap flex items-center gap-1.5"><span class="hidden lg:block">Yangi ijtimoiy tarmoq</span> qo‘shish</p>
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        <social-item v-for="item in items.list" :id="item.id" :icon="item.icon" :url="item.url" :priority="item.priority"   :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: item.id, text: 'Diqqat, ijtimoiy tarmoqni o‘chirishga aminmisiz?', title: `${item.url}`, url: 'social', callback: getItems })"/>
      </div>

      <the-modal ref="modalRef" @submit="OPEN_LOADING_MODAL" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
    </div>

    <base-loading />
  </div>
</template>
