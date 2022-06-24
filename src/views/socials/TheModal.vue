<script setup lang="ts">
import { postPutSocial, reset } from '@/services/social';
import type { Social, Form } from '@/services/social'
import { defineAsyncComponent, reactive, ref } from 'vue'
const imageRef = ref()
const emit = defineEmits(["submit", "toast"])

const data = reactive<{display: boolean, formInfo: Form, error: boolean}>({
  display: false,
  error: false,
  formInfo: {
    id: null,
    url: null,
    priority: null,
    icon: null,
  }
});

async function assign(item: Social) {
  Object.assign(data.formInfo, item)
  setTimeout(() => {
    imageRef.value.setImage(item.icon)
  }, 100)
}

function open(item: Social) {
  data.display = true
  if (item.id !== undefined) {
    assign(item)
  } else {
    reset(data.formInfo)
  }
}

async function submit() {
  emit("submit")
  const image = await imageRef.value.getImage()
  postPutSocial(data.formInfo, image).then((res) => {
    if(data.formInfo.id != null && res[1] !== null) {
      emit('toast', 'Ijtimoiy tarmoq yangilandi')
    } else if(res[1] !== null) {
      emit('toast', 'Yangi ijtimoiy tarmoq qo‘shildi')
    }
  })
  data.display = false
}

function showError() {
  data.error = true
  setTimeout(() => {
    data.error = false
  }, 3000);
}
defineExpose({
  open
})
</script>
<template>
  <Modal v-if="data.display">
    <div class="h-screen flex items-center">
      <div class="bg-white-primary p-8 shadow-lg rounded-2xl z-0" :class="data.display ? 'z-0 scale-100 animate-blowUp': ''">
      <div class="flex justify-between">
        <h2 class="text-xl font-semibold text-black-primary"> {{ data.formInfo.id === undefined ? 'Yangi kategoriya qo‘shish' : 'Tahrirlash' }}</h2>
        <i @click="reset(data.formInfo); data.display = false" class="cursor-pointer ri-close-line text-black-primary text-xl" />
      </div>
      <form action="" @submit.prevent="submit" class="w-102">
      <div class="flex flex-col mt-12 mb-8">
        <div v-if="data.error" class="text-red-primary mb-3.5">
          Iltimos, ijtimoiy tarmoq suratini joylang!
        </div>
        <div class="flex items-end">
          <div class="border border-gray-secondary rounded h-30 w-30 bg-gray-primary mr-3.5">
            <image-box ref="imageRef" class="rounded h-30 w-30" @invalid-input="showError"/>
          </div>
          <input type="number" v-model="data.formInfo.priority" class="input mt-3.5" placeholder="Muhimligi" required>
        </div>
        <input type="text" v-model="data.formInfo.url" class="input mt-3.5" placeholder="Havola" required>
      </div>
      <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">{{ data.formInfo.id === undefined ? 'Qo‘shish' : 'O‘zgarishlarni saqlash' }}</button>
      </form>
    </div>
    </div>
    </Modal>
</template>
