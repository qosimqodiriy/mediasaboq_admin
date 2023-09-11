<script setup lang="ts">
import { getAuthors } from '@/services/authors'
import { defineAsyncComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { AuthorModel } from '@/services/authors'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const route = useRoute()
const router = useRouter()
const searchInput = ref('')

const TheModal = defineAsyncComponent( () => import('./TheModal.vue') );
const AuthorItem = defineAsyncComponent( () => import('./AuthorItem.vue') );

const activeTrue = ref<{list: AuthorModel[]}>({ list: [] });
const activeFalse = ref<{list: AuthorModel[]}>({ list: [] });
const items = ref<{isLoading: boolean, count: number, list: AuthorModel[]}>({
  isLoading: false,
  count: 0,
  list: [],
})


function openModal(val: any) {
  modalRef.value.open(val)
}

async function changeQuery(param: { key: string, value:number }) {
  const query = {
    ...route.query
  }
  query[param.key] = String(param.value)
  await router.replace({ query })
  getItems()
}
async function getItems() {
  const { offset = 0 } = route.query
  OPEN_LOADING_MODAL()
  const [error, response] = await getAuthors(searchInput.value, Number(offset))
  if(response && response.list) {
    response.list.forEach( (item: AuthorModel) => {
      if(item.isActive == true) {
        activeTrue.value.list.push(item)
      } else if(item.isActive == false) {
        activeFalse.value.list.push(item)
      }
    });
  }
  
  CLOSE_LOADING_MODAL()
  items.value.list = response.list
  items.value.count = response.count
}


getItems()
</script>


<template>
  <div>
    <div class="main bg-gray-primary px-8 md:px-10 lg:px-12 right-0 fixed top-0 bottom-0 overflow-y-scroll">
      <div class="flex justify-between items-center mb-10">
        <p class="text-black-primary text-2xl font-bold">Mualliflar</p>
        <div class="flex items-center">
          <div class="bg-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded w-52 mx-8" role="button">
            <i class="ri-search-line text-black-secondary"></i>
            <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
          </div>
          <button class="bg-orange-primary shadow-lg shadow-black-primary-500/50 items-center text-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded" role="button" @click="openModal">
            <i class="ri-add-line"></i>
            <p class="text-sm px-2 whitespace-nowrap flex items-center gap-1.5"><span class="hidden lg:block">Yangi maullif</span> qo‘shish</p>
          </button>
        </div>
      </div>
      <div class="grid xl:grid-cols-2 gap-8 pb-12">
        <div v-if="activeTrue.list.length > 0">
          <p class="text-orange-primary text-lg font-bold pb-2">Active: <span class="font-semibold text-black-primary">true</span></p>
          <table class="bg-white-primary">
            <thead>
              <th>ID</th>
              <th>Ismi sharifi</th>
              <th>Foydalanuvchi nomi</th>
              <th>Amal</th>
            </thead>
            <tbody v-for="item in activeTrue.list" :key="item.id">
              <author-item v-if="item.isActive == true" :id="Number(item.id)" :username="item.username" :token="item.token" :uuid="item.uuid" :password="item.password" :name="item.name" :isActive="item.isActive" :image="item.image" :description="item.description" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, muallifni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'author', callback: getItems })"/>
            </tbody>
          </table>
        </div>

        <div v-if="activeFalse.list.length > 0">
          <p class="text-orange-primary text-lg font-bold pb-2">Active: <span class="font-semibold text-black-primary">false</span></p>
          <table class="bg-white-primary">
            <thead>
              <th>ID</th>
              <th>Ismi sharifi</th>
              <th>Foydalanuvchi nomi</th>
              <th>Amal</th>
            </thead>
            <tbody v-for="item in activeFalse.list" :key="item.id">
              <author-item v-if="item.isActive == false" :id="Number(item.id)" :username="item.username" :token="item.token" :uuid="item.uuid" :password="item.password" :name="item.name" :isActive="item.isActive" :image="item.image" :description="item.description" @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: Number(item.id), text: 'Diqqat, muallifni o‘chirishga aminmisiz?', title: `${item.name}`, url: 'author', callback: getItems })"/>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- <base-pagination :active="Math.trunc(Number(route.query.offset)/10) + 1 || 1" :perPage="10" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*10})"/> -->
      <the-modal ref="modalRef" @submit="OPEN_LOADING_MODAL" @toast="(val: any) => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
    </div>

    <base-loading />
  </div>
</template>
