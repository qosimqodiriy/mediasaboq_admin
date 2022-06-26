<script setup lang="ts">
import { getAdmin } from '@/store/admin';
import { defineAsyncComponent, ref } from 'vue'
import type { AdminModel } from '../../services/admin';
import { OPEN_NOTIFICATION } from '../../store';
const TheModal = defineAsyncComponent(() =>
  import('./TheModal.vue')
)
const items = ref<{admin: AdminModel}>({
    admin: {}
})

const modalRef = ref()
async function getItems() {
  const admin = getAdmin()
  items.value.admin = admin
}

function openModal(val: any) {
  modalRef.value.open(val)
}
getItems()
</script>
<template>
<div class="main bg-gray-primary px-8 md:px-12 lg:px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
  <div class="flex justify-start h-28 items-center">
    <p class="text-3xl text-black-primary font-bold">Sozlamalar</p>
  </div>
  <div class="grid grid-cols-2">
    <div class="bg-white-primary p-8 rounded flex flex-col justify-center relative">
      <div role="button" class="bg-yellow-secondary w-11 h-11 flex justify-center items-center rounded-full ml-2.5 absolute top-6 right-6" @click="openModal(items.admin)">
          <i class="ri-pencil-line text-xl text-yellow-primary"></i>
        </div>
    <p class="font-semibold text-xl text-black-primary">Foydalanuchi nomi: <span class="text-base font-normal">{{items.admin.username}}</span></p>
    <p class="font-semibold text-xl text-black-primary">Parol: <span class="text-base font-normal">{{items.admin.password}}</span></p>
    </div>
  </div>
  <the-modal ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })"/>
</div>
</template>