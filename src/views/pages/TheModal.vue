<script setup lang="ts">
import { putFooter } from '@/services/staticPages';
import { postPutTag, type TagModel, reset } from '@/services/tags'
import { reactive } from 'vue'
const emit = defineEmits(["submit", "toast"])
const data = reactive<{display: boolean, footer:{uz: string, eng: string}}>({
  display: false,
  footer: {
    uz: '',
    eng:''
  }
});

function open(item: {footer: {uz: string, eng: string}}) {
  data.display = true
  data.footer = Object.assign({}, item.footer)
  console.log(item)
}

async function submit() {
  emit("submit")
  putFooter({ footer: data.footer }).then((res) => {
    emit('toast', 'Footer yangilandi!')
  })
  data.display = false
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
        <h2 class="text-xl font-semibold text-black-primary">Tahrirlash</h2>
        <i @click="data.display = false" class="cursor-pointer ri-close-line text-black-primary text-xl" />
      </div>
      <form action="" @submit.prevent="submit" class="w-102">
        <div class="flex flex-col mb-8">
          <div class="flex flex-col">
            <input type="text" v-model="data.footer.uz" class="mt-3.5 input" placeholder="O'zbek tilida" required>
            <input type="text" v-model="data.footer.eng" class="mt-3.5 input" placeholder="In English" required>
          </div>
        </div>
        <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">O‘zgarishlarni saqlash</button>
      </form>
    </div>
    </div>
    </Modal>
</template>
