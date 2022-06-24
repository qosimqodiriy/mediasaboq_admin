<script setup lang="ts">
import { reactive, ref } from 'vue';
import { _deleteModal, _loading, _toast, OPEN_NOTIFICATION } from '@/store'
import router from '@/router'
import { useRoute } from 'vue-router';
import { putAboutUs } from '@/services/staticPages';
import TextEditor from '../../components/TextEditor.vue';
const emit = defineEmits(['toast'])
undefined
const route = useRoute()
const imageRef = ref()
const data = reactive<{formInfo: {body: {uz: string, eng: string},contacts: {icon:string, name: string,contact:string}[]}, error: boolean}>({
  formInfo: {
    body: {
      uz: '',
      eng:''
    },
    contacts: []
  },
  error: false
})
const contact = reactive({
  name: '',
  contact: ''
})
async function assign() {
  const item = JSON.parse(String(route.query.item))
  if (item != undefined) {
    Object.assign(data.formInfo, item)
  }
}
assign();

async function addNewContact() {
  const image = await imageRef.value.getImage()
  data.formInfo.contacts.push({ icon: image, name: contact.name, contact: contact.contact })
  imageRef.value.setImage(null)
  contact.name = ''
  contact.contact = ''
}

function submit() {
  putAboutUs(data.formInfo).then((res) => {
      emit('toast', 'Sahifa yangilandi')
      router.go(-1)
  })
}

function removeContact(item: {icon: string, name: string, contact: string}) {
  data.formInfo.contacts = data.formInfo.contacts.filter(i => i != item)
}

function showError() {
  data.error = true
  setTimeout(() => {
    data.error = false
  }, 3000);
}

</script>
<template>
<div class="main bg-gray-primary px-20 right-0 fixed top-0 bottom-0 overflow-y-scroll">
  <div class="flex h-28 items-center" @click="router.go(-1)" role="button">
    <div class="bg-white-primary flex items-center rounded-full h-11.5 w-11.5 justify-center">
      <i class="ri-arrow-left-line text-black-primary text-xl"></i>
    </div>
    <p class="font-bold text-black-primary text-2xl leading-8 mx-3.5">Statik sahifalar</p>
  </div>
  <form action="" @submit.prevent="submit" class="w-100 bg-white-primary p-8 rounded">
    <TextEditor v-model="data.formInfo.body.uz" placeholder="O'zbek tilida"/>
    <TextEditor v-model="data.formInfo.body.eng" placeholder="In English" />
    <div v-if="data.error" class="text-red-primary my-3">
          Iltimos, aloqa suratini joylang!
    </div>
    <div class="grid grid-cols-2 gap-3.5 mt-4">
      <div class="flex items-center justify-between border border-gray-secondary p-3.5 rounded" v-for="item in data.formInfo.contacts">
      <div class="flex items-center">
        <BaseImage :src="item.icon" class="h-11 w-11 rounded"/>
        <a :href="item.contact" class="ml-3.5 text-xl font-medium">{{item.name}}</a>
      </div>
        <div role="button" class="bg-red-secondary w-11 h-11 flex justify-center items-center rounded-full ml-2.5" @click="removeContact(item)">
        <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
      </div>
      </div>
      <form @submit.prevent="addNewContact" class="flex items-center justify-start border border-gray-secondary p-3.5 rounded">
      <div class="flex items-center">
        <image-box ref="imageRef" @invalid-input="showError" class="h-11 w-11 border border-gray-secondary rounded bg-gray-primary"/>
        <div>
          <input type="text" v-model="contact.name" class="ml-3.5 item-input" placeholder="Nomi" required>
          <input type="text" v-model="contact.contact" class="ml-3.5 item-input" placeholder="Havola" required>
        </div>
      </div>
        <button type="submit" role="button" class="bg-gray-secondary w-11 h-11 flex justify-center items-center rounded-full">
        <i class="ri-add-line text-xl text-black-primary"></i>
      </button>
      </form>
    </div>
    <button class="px-8 mt-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">O‘zgarishlarni saqlash</button>
  </form>
</div>
</template>

<style scoped>
.item-input {
  height: 20px;
  border-bottom: 1px solid #f4f4f4;
}

.item-input:focus {
  outline: none;
}
</style>