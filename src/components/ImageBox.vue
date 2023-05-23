<script setup lang="ts">
import FormData from 'form-data'
import { uploadPhoto } from '@/services/common'
import {reactive, computed, onMounted, ref} from 'vue'

const inputRef = ref();
const url = import.meta.env.VITE_BASE_URL2
const emit = defineEmits(["invalidInput"])


function click() {
  inputRef.value.click()
}

function sendEmit() {
  emit("invalidInput")
}
const data = reactive<{uid: number, src: string | null, file: string | null, width: number, height: number, isLocal: boolean, image: string, loading: boolean}>({
  uid: 0,
  src: '',
  file: '',
  width: 0,
  height: 0,
  isLocal: false,
  image: '',
  loading: false
})

const getImageURL = computed(() => {
  let result;
  if (data.isLocal) {
    result = data.src
  } else {
    if (data.src) {
      result = `${data.src}`
    }
  }
  return result
})

onMounted(() => {
  data.uid = Math.random()
})

async function  imageSelected(e: any) {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  data.loading = true
  await uploadPhoto(formData).then(res => {
    data.image = `${res[1].data}`
    data.src = `${url}${res[1].data}`
    data.loading= false
  })
}

function setImage(src: string) {
  if(src === null ) {
    data.src = src
    data.image = src
  } else {
  data.src = `${url}${src}`
  data.image = src
  data.isLocal = false
  }
}

function getImage() {
  return data.image
}

defineExpose({
  setImage,
  getImage
})
</script>

<template>
  <div>
    <div class="relative h-full w-full rounded flex items-center justify-center" @click="click" >
      <img v-if="data.src" :id="`${data.uid}`" :src="`${getImageURL}`" alt="" class="object-cover opacity-50 h-full w-full rounded absolute top-0 left-0">
      <i class="h-11 w-11 flex items-center justify-center z-10 text-2xl text-white-primary" :class="data.loading ? 'ri-loader-4-fill text-gray-secondary' : data.src ? 'ri-pencil-line': 'ri-camera-line text-gray-secondary'" />
    </div>
    <input ref="inputRef" name="image" @invalid="sendEmit" type="file" hidden accept="image/*" @change="imageSelected" :required="data.src ? false : true">
  </div>
</template>

<style scoped>
.ri-loader-4-fill {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>