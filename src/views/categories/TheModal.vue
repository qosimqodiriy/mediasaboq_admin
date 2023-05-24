<script setup lang="ts">
import { postPutCategory, reset, tabs } from '@/services/categories';
import type { Category } from '@/services/categories'
import { reactive, ref } from 'vue'
const emit = defineEmits(["submit", "toast"])
const imageRef = ref()
const data = reactive<{display: boolean, error: boolean, formInfo: Category, msg: string}>({
  display: false,
  error: false,
  msg: '',
  formInfo: {
    name: '',
    lang: '',
    articleCount: 0,
    type: 0,
    slug: '',
    image: ''
  }
});

function open(item: Category) {
  data.display = true
  if (item.id !== undefined) {
    data.formInfo = Object.assign({}, item)
    setTimeout(() => {
    imageRef.value.setImage(item.image)
  }, 100)
  } else {
    reset(data.formInfo)
  }
}

async function submit() {
  emit("submit")
  const image = await imageRef.value.getImage()
  postPutCategory(data.formInfo, image).then((res) => {
    if(data.formInfo.id && res[1] !== null) {
      emit('toast', 'Kategoriya yangilandi')
      data.display = false
    } else if(res[1] !== null) {
      emit('toast', 'Yangi kategoriya qo‘shildi')
      data.display = false
    }  else {
      data.error = true
      data.msg = 'Bu slug nomi mavjud!'
      setTimeout(() => {
        data.error = false
      }, 3000);
    }
  })
}
function showError() {
  data.msg="Iltimos, kategoriya suratini joylang!"
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
          <h2 class="text-xl font-semibold text-black-primary"> {{ data.formInfo.id != undefined ? 'Tahrirlash' : 'Yangi kategoriya qo‘shish' }}</h2>
          <i @click="reset(data.formInfo); data.display = false" class="cursor-pointer ri-close-line text-black-primary text-xl" />
        </div>
        <form action="" @submit.prevent="submit" class="w-102">
          <div v-if="data.error" class="text-red-primary mb-3.5">
              {{data.msg}}
          </div>
          <div class="flex flex-col mt-8 mb-8">
            <div class="flex items-end">
              <div class="border border-gray-secondary rounded w-30 h-30 bg-gray-primary">
                <image-box ref="imageRef" class="rounded w-30 h-30" @invalid-input="showError"/>
              </div>
              <select name="lang" id="lang" v-model="data.formInfo.lang" required class="mx-3.5">
                <option :value="''" disabled selected>Til</option>
                <option value="uz">O'zbek tili</option>
                <option value="eng">English</option>
              </select>
              <select name="lang" id="lang" v-model="data.formInfo.type" required>
                <option :value="0" disabled selected>Turi</option>
                <option :value="1">Media</option>
                <option :value="2">Ta'lim</option>
              </select>
            </div>
            <div class="flex flex-col">
              <input type="text" v-model="data.formInfo.name" class="mt-3.5 input" placeholder="Nomi" required>
              <input type="text" pattern="[A-Za-z0-9_-]+" v-model="data.formInfo.slug" class="mt-3.5 input" placeholder="Slug" required>
            </div>
          </div>
          <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">{{ data.formInfo.id != undefined ? 'O‘zgarishlarni saqlash' :  'Qo‘shish'}}</button>
        </form>
      </div>
    </div>
  </Modal>
</template>
