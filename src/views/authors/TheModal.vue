<script setup lang="ts">
import { postPutAuthor, reset } from '@/services/authors'
import type { AuthorModel } from '@/services/authors'
import { reactive, ref } from 'vue';
const emit = defineEmits(["toast"])
const title = reactive({
  name: 'Nomi'
})
const imageRef = ref()
const data = reactive<{ display: boolean, error: boolean, msg: string, formInfo: AuthorModel}>({
  display: false,
  error: false,
  msg: '',
  formInfo: {
    name: '',
    username: '',
    image: '',
    description: '',
    isActive: true,
    password: '',
    uuid: '',
    token: ''
  }
});

function open(item: AuthorModel) {
  title.name = 'Nomi'
  data.display = true
  if (item.id !== undefined) {
    data.formInfo = Object.assign({}, item)
    setTimeout(() => {
    imageRef.value.setImage(item.image)
  }, 100)
  } else {
    reset(data.formInfo)
    data.formInfo.isActive = true
  }
}

async function submit() {
  const image = await imageRef.value.getImage()
  postPutAuthor(data.formInfo, image).then((res: any) => {
    if(data.formInfo.id && res[1] !== null) {
      emit('toast', 'Muallif yangilandi')
      data.display = false
    } else if(res[1] !== null) {
      emit('toast', 'Yangi muallif qo‘shildi')
      data.display = false
    } else if(res[0].response.status = 409) {
      data.error = true
      data.msg = 'Bu foydalanuvchi nomi band!'
      setTimeout(() => {
        data.msg = ''
        data.error = false
      }, 3000);
    }
  })
}

function showError() {
  data.error = true
  data.msg = 'Iltimos, muallif suratini joylang!'
  setTimeout(() => {
    data.msg = ''
    data.error = false
  }, 3000);
}

defineExpose({
  open
})
</script>
<template>
  <Modal v-if="data.display">
    <div class="flex items-center h-full">
      <div class="bg-white-primary p-8 shadow-lg rounded-2xl z-0" :class="data.display ? 'z-0 scale-100 animate-blowUp': ''">
      <div class="flex justify-between">
        <h2 class="text-xl font-semibold text-black-primary"> {{ data.formInfo.id != undefined ? 'Tahrirlash' : 'Yangi muallif qo‘shish' }}</h2>
        <i @click="reset(data.formInfo); data.display = false" class="cursor-pointer ri-close-line text-black-primary text-xl" />
      </div>
      <form action="" @submit.prevent="submit" class="w-102">
        <div class="flex items-end mt-8">
          <div class="border border-gray-secondary rounded w-30 h-30 bg-gray-primary">
            <image-box ref="imageRef" class="rounded w-30 h-30" @invalid-input="showError"/>
          </div>
          <label class="switch ml-3.5">
            <input type="checkbox" :checked="data.formInfo.isActive" @click="data.formInfo.isActive = !data.formInfo.isActive">
            <span class="slider round"></span>
          </label>
        </div>
        <div v-if="data.error" class="text-red-primary my-3.5">
          {{data.msg}}
        </div>
        <input type="text" v-model="data.formInfo.name" class="input mt-3.5" placeholder="Ismi sharifi" required autocomplete="off">
        <div class="flex flex-col my-3.5">
          <div class="grid grid-cols-2 gap-3.5">
            <input type="text" pattern="[A-Za-z0-9_-]+" v-model="data.formInfo.username" class="input" :class="data.error ? 'error_input' : ''" placeholder="Foydalanuvchi nomi" required autocomplete="off">
            <input type="text" v-model="data.formInfo.password" class="input" placeholder="Parol" required>
          </div>
            <textarea placeholder="Qo'shimcha" rows="5" cols="10" v-model="data.formInfo.description" class="mt-3.5"></textarea>
        </div>
        <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">{{ data.formInfo.id != undefined ? 'O‘zgarishlarni saqlash' :  'Qo‘shish'}}</button>
      </form>
    </div>
    </div>
    </Modal>
</template>


<style scoped>
.error_input {
  color: red !important;
}
</style>