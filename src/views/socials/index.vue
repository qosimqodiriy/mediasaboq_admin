<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import type { Social } from '@/services/social'
import { getSocials } from '@/services/social'
import { useRouter, useRoute } from 'vue-router'
import { _deleteModal, _loading, _toast, OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'
const route = useRoute()
const router = useRouter()
const SocialItem = defineAsyncComponent(() =>
  import('./SocialItem.vue')
);
const TheModal = defineAsyncComponent(() =>
  import('./TheModal.vue')
)
const items = ref<{isLoading: boolean, list: Social[]}>({
    isLoading: false,
    list: []
})

const modalRef = ref()
const searchInput = ref('')
async function getItems() {
    OPEN_LOADING_MODAL()
    const [error, response] = await getSocials(searchInput.value)
    CLOSE_LOADING_MODAL()
    items.value.list = response
}

function openModal(val: any) {
  modalRef.value.open(val)
}
getItems()
</script>
<template>
<div class="main bg-gray-primary px-8 md:px-12 lg:px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
  <div class="flex justify-between h-28 items-center">
    <p class="text-black-primary text-2xl font-bold">Ijtimoiy tarmoqlar</p>
    <div class="flex">
      <div class="bg-white-primary flex px-5.5 py-3 rounded w-52 mx-8" role="button">
        <i class="icon-search" />
        <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
      </div>
      <button class="bg-orange-primary flex px-5.5 py-3 rounded shadow-lg shadow-black-primary-500/50" role="button" @click="openModal">
        <i class="icon-plus" />
        <p class="text-sm text-white-primary px-2">Yangi ijtimoiy tarmoq qo‘shish</p>
      </button>
    </div>
  </div>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <social-item v-for="item in items.list" :id="item.id" :icon="item.icon" :url="item.url" :priority="item.priority"   :key="item.id" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: item.id, text: 'Diqqat, ijtimoiy tarmoqni o‘chirishga aminmisiz?', title: `${item.url}`, url: 'social', callback: getItems })"/>
  </div>
  <the-modal ref="modalRef" @submit="OPEN_LOADING_MODAL" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
</div>
</template>
