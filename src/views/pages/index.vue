<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { _deleteModal, _loading, _toast, OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'
import type { aboutUs } from '@/services/staticPages/entity'
import { getAboutUs, getFooter } from '@/services/staticPages'


const modalRef = ref()
const iconActive = ref(false);
const aboutActive = ref(false);

const TheModal = defineAsyncComponent( () => import('./TheModal.vue') )

const items = ref<{ isLoading: boolean, footer: { footer: { uz?: string, eng?: string } }, aboutUs: aboutUs}>({
  isLoading: false,
  footer: {footer:{}},
  aboutUs: {}
})

function openModal(val: any) {
  modalRef.value.open(val)
}

async function getItems() {
  OPEN_LOADING_MODAL()
  const [error, response] = await getFooter()
  const [error2, response2] = await getAboutUs()
  CLOSE_LOADING_MODAL()
  items.value.footer = response
  items.value.aboutUs = response2
}

getItems()
</script>


<template>
  <div>
    <div class="main bg-gray-primary px-8 md:px-12 lg:px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
      <div class="flex justify-start h-28 items-center">
        <p class="text-black-primary text-2xl font-bold">Statik sahifalar</p>
      </div>
      <div class="grid lg:grid-cols-2 gap-8">
        <div>
          <p class="text-2xl text-black-primary mb-3.5 font-medium">Footer</p>
          <div class="rounded bg-white-primary p-8 relative" @mouseenter="iconActive = !iconActive" @mouseleave="iconActive = !iconActive">
            <div class="flex absolute top-3.5 right-3.5 z-10" v-if="iconActive">
              <div role="button" class="bg-yellow-secondary w-11 h-11 flex justify-center items-center rounded-full" @click="openModal(items.footer)">
                <i class="ri-pencil-line text-xl text-yellow-primary"></i>
              </div>
            </div>
            <p>{{items.footer.footer.uz}}</p>
            <p class="mt-3.5">{{items.footer.footer.eng}}</p>
          </div>
        </div>
        <div>
          <p class="text-2xl text-black-primary mb-3.5 font-medium">About US</p>
          <div class="rounded bg-white-primary p-8 relative" @mouseenter="aboutActive = !aboutActive" @mouseleave="aboutActive = !aboutActive">
            <div class="flex absolute top-3.5 right-3.5 z-10" v-if="aboutActive">
              <router-link :to="{path: '/aboutUs', query: {item: JSON.stringify(items.aboutUs)}}"  role="button" class="bg-yellow-secondary w-11 h-11 flex justify-center items-center rounded-full">
                <i class="ri-pencil-line text-xl text-yellow-primary"></i>
              </router-link>
            </div>
            <p v-html="items.aboutUs.body?.uz"></p>
            <p v-html="items.aboutUs.body?.eng"></p>
            <p class="text-xl text-black-primary mb-3.5 font-medium mt-3.5">Contacts</p>
            <div>
              <a :href="item.contact" target="_blank" v-for="item in items.aboutUs.contacts" :key="item.name" class="flex items-center mb-3.5">
                <base-image :src="item.icon" class="h-11 w-11 rounded" />
                <p class="ml-3.5">{{item.name}}</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <the-modal ref="modalRef" @submit="OPEN_LOADING_MODAL" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
    </div>

    <base-loading />
  </div>
</template>