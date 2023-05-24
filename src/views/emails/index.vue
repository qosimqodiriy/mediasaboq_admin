<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type EmailModel, getEmails } from '@/services/emails'
import { OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL } from '@/store'


const modalRef = ref()
const route = useRoute()
const router = useRouter()
const searchInput = ref('')

const EmailItem = defineAsyncComponent(() => import('./EmailItem.vue'));

const items = ref<{isLoading: boolean, count: number, list: EmailModel[]}>({
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
  const [error, response] = await getEmails(searchInput.value, Number(offset))
  CLOSE_LOADING_MODAL()
  if (response) {
    items.value.count = response.count
    items.value.list = response.list    
  }
}


getItems()
</script>


<template>
  <div>
    <div class="main bg-gray-primary px-8 md:px-10 lg:px-12 right-0 fixed top-0 bottom-0 overflow-y-scroll">
      <div class="flex justify-between items-center mb-10">
        <p class="text-3xl font-bold text-black-primary">Emaillar</p>
        <div class="flex">
          <div class="bg-white-primary flex px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded w-52 mx-8" role="button">
            <i class="ri-search-line text-black-secondary"></i>
            <input type="search" name="search" v-model="searchInput" @input="getItems" placeholder="Qidiruv" class="placeholder:text-black-200 text-black-200 focus:outline-none text-sm px-2 w-35">
          </div>
        </div>
      </div>
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="block lg:hidden">
          <table class="bg-white-primary">
            <thead>
              <th>ID</th>
              <th>Email</th>
            </thead>
            <tbody>
              <email-item v-for="item in items.list" :id="Number(item.id)" :key="item.id" :url="item.url"/>
            </tbody>
          </table>
        </div>

        <div class="hidden lg:block">
          <table class="bg-white-primary">
            <thead>
              <th>ID</th>
              <th>Email</th>
            </thead>
            <tbody>
              <email-item v-for="item in items.list.slice(0, 5)" :id="Number(item.id)" :key="item.id" :url="item.url"/>
            </tbody>
          </table>
        </div>
        
        <div class="hidden lg:block">
          <table class="bg-white-primary" v-if="items.list.length > 5">
            <thead>
              <th>ID</th>
              <th>Email</th>
            </thead>
            <tbody>
              <email-item v-for="item in items.list.slice(5, 10)" :id="Number(item.id)" :key="item.id" :url="item.url"/>
            </tbody>
          </table>
        </div>
      </div>

      <base-pagination v-if="items.count > 10" :active="Math.trunc(Number(route.query.offset)/10) + 1 || 1" :perPage="10" :items="items.count" @change="(val:number) => changeQuery({key: 'offset', value: (val - 1)*10})"/>
    </div>

    <base-loading />
  </div>
</template>