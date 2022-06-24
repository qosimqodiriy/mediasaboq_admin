<script setup lang="ts">
import { _deleteModal, CLOSE_DELETE_MODAL, CLOSE_DELETE } from '@/store/deleteModal';
import Modal from './GlobalModal.vue';
import router from '@/router'
import { deleteItem } from '@/services/common';
const emit = defineEmits(["submit"]);
async function submit() {
  const repsonse = await deleteItem({ id: _deleteModal.id}, _deleteModal.url).then(res => {
  })
  if (_deleteModal.callback === undefined) {
    router.go(-1)
  }
  CLOSE_DELETE_MODAL()
}

</script>

<template>
  <Modal v-if="_deleteModal.visible">
    <div class="h-full w-full flex justify-center items-center">
      <div class="bg-white-primary p-8 shadow-lg rounded-2xl w-98" :class="_deleteModal.visible ? 'z-0 scale-100 animate-blowUp': ''">
    <div class="flex justify-between">
      <div class="bg-red-secondary w-11 h-11 flex items-center justify-center p-3 rounded-full">
        <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
      </div>
      <i class="cursor-pointer ri-close-line text-xl text-black-primary" @click="CLOSE_DELETE"></i>
    </div>
    <div class="flex flex-col my-8">
      <p class="text-xl font-semibold">{{_deleteModal.text}}</p>
      <p class="text-sm text-black-secondary leading-4 py-1.5 break-words">{{_deleteModal.title}}</p>
    </div>
    <button @click="submit" class="px-8 py-3.5 bg-red-primary text-white-primary rounded" type="button">O‘chirish</button>
    </div>
    </div>
  </Modal>
</template>