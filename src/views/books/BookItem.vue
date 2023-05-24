<script setup lang="ts">
import { ref } from 'vue';
import BaseImage from '../../components/BaseImage.vue';
const emit = defineEmits(["remove", "edit"])
const iconActive = ref(false);
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  bookAuthor: {
    type: String,
    required: true
  },
  category: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true
  }
})
</script>
<template>
  <div class="bg-white-primary border-2 border-black-primary relative m-0" @mouseenter="iconActive = !iconActive" @mouseleave="iconActive = !iconActive">
    <div class="flex absolute top-3.5 right-3.5 z-10" v-if="iconActive">
      <router-link :to="{path: '/book', query: {item: JSON.stringify(props)}}" role="button" class="bg-yellow-secondary w-11 h-11 flex justify-center items-center rounded-full" >
        <i class="ri-pencil-line text-xl text-yellow-primary"></i>
      </router-link>
      <div role="button" class="bg-red-secondary w-11 h-11 flex justify-center items-center rounded-full ml-2.5" @click="emit('remove', props.id, props.name)">
        <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
      </div>
    </div>
    <div class="flex flex-col">
        <BaseImage :src="props.image" class="w-100 h-68 object-cover object-center"/>
      <div class="p-3.5">
        <p class="text-xl text-black-primary lines font-semibold">{{props.name}}</p>
        <p class="text-sm text-black-secondary">{{props.bookAuthor}}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.lines {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:100%;
}
</style>
