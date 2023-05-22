<script setup lang="ts">
import { postPutTag, type TagModel, reset } from '@/services/tags'
import { reactive } from 'vue'
const emit = defineEmits(["toast"])
const title = reactive({
  name: 'Nomi'
})
const data = reactive<{ error: boolean, display: boolean, formInfo: TagModel }>({
  error: false,
  display: false,
  formInfo: {
    name: '',
    lang: '',
  }
});

function open(item: TagModel) {
  title.name = 'Nomi'
  data.display = true
  if (item.id !== undefined) {
    data.formInfo = Object.assign({}, item)
  } else {
    reset(data.formInfo)
  }
}

async function submit() {
  postPutTag(data.formInfo).then((res) => {
    if(data.formInfo.id && res[1] !== null) {
      emit('toast', 'Teg yangilandi')
      data.display = false
    } else if(res[1] !== null) {
      emit('toast', 'Yangi teg qo‘shildi')
      data.display = false
    } else {
      data.error = true,
      setTimeout(() => {
        data.error = false
      }, 3000);
    }
  })
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
        <h2 class="text-xl font-semibold text-black-primary"> {{ data.formInfo.id != undefined ? 'Tahrirlash' : 'Yangi teg qo‘shish' }}</h2>
        <i @click="reset(data.formInfo); data.display = false" class="cursor-pointer ri-close-line text-black-primary text-xl" />
      </div>
      <form action="" @submit.prevent="submit" class="w-102">
        <div class="flex flex-col mt-12 mb-8">
          <p class="my-3 text-red-primary" v-if="data.error">Bunday teg nomi mavjud!</p>
          <select name="lang" id="lang" v-model="data.formInfo.lang" required>
            <option :value="''" disabled selected>Til</option>
            <option value="uz" @click="title.name = 'Nomi'">O'zbek tili</option>
            <option value="eng" @click="title.name = 'Name' ">English</option>
          </select>
          <div class="flex flex-col">
          <input type="text" pattern="[A-Za-z0-9_-]+" v-model="data.formInfo.name" class="mt-3.5 input" :placeholder="title.name" required>
          </div>
        </div>
        <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">{{ data.formInfo.id != undefined ? 'O‘zgarishlarni saqlash' :  'Qo‘shish'}}</button>
      </form>
    </div>
    </div>
    </Modal>
</template>
