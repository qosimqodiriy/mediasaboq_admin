<script setup lang="ts">
import { reactive, ref, defineAsyncComponent } from 'vue';
import { postPutBook, type BookModel } from '@/services/books';
import { useRoute } from 'vue-router'
import { getCategory } from '@/services/category';
import router from '@/router'
import { OPEN_DELETE_MODAL } from '@/store';
import { reset } from '@/services/books';
const route = useRoute()
const emit = defineEmits(['toast'])
const imageRef = ref()
const TheEditor = defineAsyncComponent(() =>
  import('@/components/TextEditor.vue')
)
const data = reactive<{ formInfo: BookModel, error: boolean, displayCategory: {id: number, name: string}[], msg: string }>({
  displayCategory: [],
  msg: '',
  error: false,
  formInfo: {
    name: '',
    title: '',
    slug: '',
    description: '',
    image: '',
    url: '',
    bookAuthor: '',
    lang: '',
    isActive: false,
    isDeleted: false,
    category: {}
  }
});

(function() {
  getCategory(null).then(res => {
    data.displayCategory = res[1].list
  })
})()

async function assign() {
  const item = JSON.parse(String(route.query.item))
  if (item != undefined) {
    Object.assign(data.formInfo, item)
    setTimeout(() => {
    imageRef.value.setImage(item.image)
  }, 100)
  } else {
    reset(data.formInfo)
  }
}
assign();

async function submit() {
  const image = await imageRef.value.getImage()
  postPutBook(data.formInfo, image).then((res) => {
    if(data.formInfo.id && res[1] !== null) {
      emit('toast', 'Kitob yangilandi')
      router.go(-1)
    } else if(res[1] !== null) {
      emit('toast', 'Yangi kitob qo‘shildi')
      router.go(-1)
    } else {
      data.error = true
      data.msg = 'Bu slug nomi mavjud!'
      setTimeout(() => {
        data.error = false
      }, 3000);
    }
  })
}

function showError() {
  data.error = true
  data.msg = 'Iltimos, kitob suratini joylang!'
  setTimeout(() => {
    data.error = false
  }, 3000);
}

</script>
<template>
<div class="main bg-gray-primary px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
  <div>
    <div class="flex h-28 items-center" @click="router.go(-1)" role="button">
    <div class="bg-white-primary flex items-center rounded-full h-11.5 w-11.5 justify-center">
      <i class="ri-arrow-left-line text-black-primary text-xl"></i>
    </div>
    <p class="font-bold text-black-primary text-2xl leading-8 mx-3.5">Kutubxona</p>
  </div>
  <form action="" @submit.prevent="submit" class="w-100 bg-white-primary p-8 rounded">
  <div v-if="data.error" class="text-red-primary mb-3.5">
          {{data.msg}}
        </div>
      <div class="flex items-end">
        <div class="border border-gray-secondary rounded w-30 h-30 bg-gray-primary">
          <image-box ref="imageRef" class="rounded w-30 h-30" @invalid-input="showError"/>
        </div>
        <label class="switch ml-3.5">
          <input type="checkbox" :checked="data.formInfo.isActive">
          <span class="slider round" @click="data.formInfo.isActive = !data.formInfo.isActive"></span>
        </label>
      </div>
      <div class="flex flex-col my-3.5">
        <div class="grid grid-cols-2 gap-3.5">
          <select name="lang" id="lang" v-model="data.formInfo.lang" required>
          <option :value="''" disabled selected>Til</option>
          <option value="uz">O'zbek tili</option>
          <option value="ru">Русский</option>
          <option value="eng">English</option>
        </select>
        </div>
        <div class="grid grid-cols-2 gap-3.5 mt-3.5">
        <input type="text" v-model="data.formInfo.name" class="input" placeholder="Kitob nomi" required>
        <input type="text" v-model="data.formInfo.bookAuthor" class="input" placeholder="Muallif" required>
        </div>
        <div class="grid grid-cols-2 gap-3.5 mt-3.5">
        <input type="text" v-model="data.formInfo.url" class="input" placeholder="Havola" required>
        <input type="text" pattern="[A-Za-z0-9_-]+" v-model="data.formInfo.slug" class="input" placeholder="Slug" required>
        </div>
        <div class="mt-3.5">
          <TheEditor placeholder="Kitob haqida" v-model="data.formInfo.description"/>
        </div>
      </div>
      <button class="px-8 py-3.5 mr-3.5 bg-red-secondary text-red-primary rounded" v-if="data.formInfo.id !== undefined"  @click="OPEN_DELETE_MODAL({ id: Number(data.formInfo.id), text: 'Diqqat, kitobni o‘chirishga aminmisiz?', title: `${data.formInfo.name}`, url: 'book' })">O'chirish</button>
      <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">{{ data.formInfo.id != undefined ? 'O‘zgarishlarni saqlash' :  'Qo‘shish'}}</button>
      </form>
  </div>
</div>
</template>

