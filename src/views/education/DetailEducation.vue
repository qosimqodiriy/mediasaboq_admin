<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { OPEN_DELETE_MODAL } from '@/store';
import type { Author } from '@/services/types';
import type { MediaModel } from '@/services/media';
import { inputDate } from '@/services/timeFunctions';
import { reactive, ref, defineAsyncComponent } from 'vue';
import { getAuthorsSelect, getCategory } from '@/services/category';
import { postPutMedia, resetEducation, getMedia } from '@/services/media';

const imageRef = ref()
const route = useRoute()
const emit = defineEmits(['toast'])
const Editor = defineAsyncComponent(() => import('@/components/TextEditor.vue'))

const data = reactive<{ formInfo: MediaModel, error: boolean, displayCategory: { id: number, name: string }[], displayAuthors: Author[], msg: string }>({
  displayCategory: [],
  displayAuthors: [],
  msg: '',
  error: false,
  formInfo: {
    title: '',
    slug: '',
    description: '',
    image: '',
    body: '',
    author: {},
    active: false,
    deleted: false,
    tags: [],
    suggests: [],
    credit: '',
    date: 0,
    lang: '',
    isTop: false,
    isMain: false,
    category: {},
    type: 2,
    seoDesc: '',
    seoMeta: '',
    seoTitle: ''
  }
});

(function () {
  getCategory(2).then(res => {
    data.displayCategory = res[1].list
  })
})();

(function () {
  getAuthorsSelect().then(res => {
    data.displayAuthors = res[1].list
  })
})();

async function assign() {
  const id = route.query.item
  if (id != undefined) {
    const [error, item] = await getMedia(Number(id))
    Object.assign(data.formInfo, item)
    data.formInfo.date = inputDate(item.date)
    data.formInfo.category = item.category.id
    data.formInfo.author = item.author.id
    setTimeout(() => {
      imageRef.value.setImage(item.image)
    }, 100)
  } else {
    resetEducation(data.formInfo)
  }
}
assign();

async function submit() {
  const image = await imageRef.value.getImage()
  postPutMedia(data.formInfo, image).then((res) => {
    if (data.formInfo.id && res[1] !== null) {
      emit('toast', 'Media blog yangilandi')
      router.go(-1)
    } else if (res[1] !== null) {
      emit('toast', 'Yangi media blog qo‘shildi')
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
  data.msg = "Iltimos, ta'lim blogi suratini joylang!"
  setTimeout(() => { data.error = false }, 3000);
}


function addTag(item: any) {
  let found = false;

  for (let i = 0; i < data.formInfo.tags.length; i++) {
    if (data.formInfo.tags[i].name == item.name) {
      found = true;
      break;
    }
  }
  if (!found) {
    data.formInfo.tags.push(item)
  }
}

function addSuggest(item: any) {
  let found = false;

  for (let i = 0; i < data.formInfo.suggests.length; i++) {
    if (data.formInfo.suggests[i].id == item.id) {
      found = true;
      break;
    }
  }
  if (!found) {
    data.formInfo.suggests.push(item)
  }
}

function removeTag(id: number) {
  data.formInfo.tags = data.formInfo.tags.filter(item => item.id != id)
}

function removeSuggest(id: number) {
  data.formInfo.suggests = data.formInfo.suggests.filter(item => item.id != id)
}

</script>


<template>
  <div class="main bg-gray-primary px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
    <div class="flex h-28 items-center" @click="router.go(-1)" role="button">
      <div class="bg-white-primary flex items-center rounded-full h-11.5 w-11.5 justify-center">
        <i class="ri-arrow-left-line text-black-primary text-xl"></i>
      </div>
      <p class="font-bold text-black-primary text-2xl leading-8 mx-3.5">Ta'lim</p>
    </div>
    <form action="" @submit.prevent="submit" class="w-100 bg-white-primary p-8 rounded">
      <div v-if="data.error" class="text-red-primary mb-3.5">
        {{data.msg}}
      </div>
      <div class="flex items-end">
        <div class="border border-gray-secondary rounded w-30 h-30 bg-gray-primary">
          <image-box ref="imageRef" class="rounded w-30 h-30" @invalid-input="showError"/>
        </div>
        <div>
          <div class="flex items-center">
            <label class="switch ml-3.5">
              <input type="checkbox" :checked="data.formInfo.isTop"  @click="data.formInfo.isTop = !data.formInfo.isTop">
              <span class="slider round"></span>
            </label>
            <p class="px-3.5">Top</p>
          </div>
          <div class="flex items-center">
            <label class="switch ml-3.5">
              <input type="checkbox" :checked="data.formInfo.isMain"  @click="data.formInfo.isMain = !data.formInfo.isMain">
              <span class="slider round"></span>
            </label>
            <p class="px-3.5">Asosiy</p>
          </div>
          <div class="flex items-center">
            <label class="switch ml-3.5">
              <input type="checkbox" :checked="data.formInfo.active"  @click="data.formInfo.active = !data.formInfo.active">
              <span class="slider round"></span>
            </label>
            <p class="px-3.5">Faol</p>
          </div>
          <div class="flex items-center">
            <label class="switch ml-3.5">
              <input type="checkbox" :checked="data.formInfo.deleted"  @click="data.formInfo.deleted = !data.formInfo.deleted">
              <span class="slider round"></span>
            </label>
            <p class="px-3.5">Favourite</p>
          </div>
        </div>
        <div class="relative w-full">
          <input type="date" id="date" v-model="data.formInfo.date" class="input" required>
          <label for="date" class="absolute top-3.5 left-6">Sana</label>
        </div>
      </div>
      <div class="flex flex-col my-3.5">
        <div class="grid grid-cols-3 gap-3.5">
          <select name="lang" id="lang" v-model="data.formInfo.lang" required>
            <option :value="''" disabled selected>Til</option>
            <option value="uz">O'zbek tili</option>
            <option value="eng">English</option>
          </select>
          <input type="text" v-model="data.formInfo.credit" class="input" placeholder="Surat olingan joy">
          <select v-model="data.formInfo.category" required>
            <option :value="{}" selected disabled>Turkum</option>
            <option v-for="c in data.displayCategory" :value="c.id" :key="c.id">{{c.name}}</option>
          </select>
        </div>
        <div class="grid grid-cols-3 gap-3.5 mt-3.5">
          <input type="text" v-model="data.formInfo.title" class="input" placeholder="Sarlavha" required>
          <select v-model="data.formInfo.author" required>
            <option :value="{}" selected disabled>Muallif</option>
            <option v-for="author in data.displayAuthors" :value="author.id" :key="author.id">{{author.name}}</option>
          </select>
          <input type="text" pattern="[A-Za-z0-9_-]+" v-model="data.formInfo.slug" class="input" placeholder="Slug" required>
        </div>
        <input type="text" v-model="data.formInfo.seoTitle" class="input mt-3.5" placeholder="Seo Title" required>
        <input type="text" v-model="data.formInfo.seoDesc" class="input mt-3.5" placeholder="Seo Description" required>
        <input type="text" v-model="data.formInfo.seoMeta" class="input mt-3.5" placeholder="Seo Meta" required>
        <div class="mt-3.5">
          <editor placeholder="Matn" v-model="data.formInfo.body"/>
        </div>
        <textarea rows="5" class="mt-3.5" cols="10" placeholder="Qo'shimcha" v-model="data.formInfo.description"/>
      </div>
      <div class="grid grid-cols-2 gap-3.5 mb-3.5">
        <div>
          <base-selection @select="addTag" :url="'tags'" :title="'Teg'" :lang="data.formInfo.lang"/>
          <div class="grid md:grid-cols-2 gap-2 mt-3.5">
            <div v-for="item in data.formInfo.tags" :key="item.id" class="relative">
              <p class="px-2 py-1 rounded border border-gray-secondary bg-white-secondary">{{ item.name }}</p>
              <img class="w-4 h-4 absolute top-2 right-2 cursor-pointer z-0" @click="removeTag(item.id)" src="@/assets/images/close-black.png" alt="">
            </div>
          </div>
        </div>
        <div>
          <the-select @select="addSuggest" :url="'articles'" :title="'O`shash maqola'" />
          <div class="grid md:grid-cols-2 gap-2 mt-3.5">
            <div v-for="item in data.formInfo.suggests" :key="item.id" class="relative">
              <p class="px-2 py-1 rounded border border-gray-secondary bg-white-secondary">{{ item.title }}</p>
              <img class="w-4 h-4 absolute top-2 right-2 cursor-pointer z-0" @click="removeSuggest(item.id)" src="@/assets/images/close-black.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <button class="px-8 py-3.5 mr-3.5 bg-red-secondary text-red-primary rounded" v-if="data.formInfo.id !== undefined"  @click="OPEN_DELETE_MODAL({ id: Number(data.formInfo.id), text: 'Diqqat, ta`lim blogni o‘chirishga aminmisiz?', title: `${data.formInfo.title}`, url: 'article' })">O'chirish</button>
      <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">{{ data.formInfo.id != undefined ? 'O‘zgarishlarni saqlash' :  'Qo‘shish'}}</button>
    </form>
  </div>
</template>