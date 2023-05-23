<script setup lang="ts">
import { reactive } from 'vue'
import { setAdmin } from '@/store/admin';
import { putAdmin, type AdminModel } from '@/services/admin';

const emit = defineEmits(["toast"])
const title = reactive({ name: 'Nomi' })
const data = reactive<{ error: boolean, display: boolean, formInfo: AdminModel }>({
  error: false,
  display: false,
  formInfo: {
  }
});

function open(item: AdminModel) {
  data.formInfo = Object.assign({}, item)
  data.formInfo.uuid = '7f89fc4f-0233-46c8-8eba-6d853f5e59c9'
  data.display = true
}

async function submit() {
  setAdmin(data.formInfo)
  putAdmin(data.formInfo).then((res) => {
    if(data.formInfo.id && res[1] !== null) {
      emit('toast', 'Admin yangilandi')
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
          <h2 class="text-xl font-semibold text-black-primary">Tahrirlash</h2>
          <i @click="data.display = false" class="cursor-pointer ri-close-line text-black-primary text-xl" />
        </div>
        <form action="" @submit.prevent="submit" class="w-102">
          <div class="flex flex-col mt-5 mb-8">
            <p class="my-3 text-red-primary" v-if="data.error">Bunday teg nomi mavjud!</p>
            <input type="text" pattern="[A-Za-z0-9_-]+" v-model="data.formInfo.username" class="mt-3.5 input" placeholder="Foydalanuvchi nomi" required>
            <input type="text" v-model="data.formInfo.password" class="mt-3.5 input" placeholder="Parol" required>
          </div>
          <button class="px-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">O‘zgarishlarni saqlash</button>
        </form>
      </div>
    </div>
  </Modal>
</template>
