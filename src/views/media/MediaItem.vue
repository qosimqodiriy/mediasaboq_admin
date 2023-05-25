<script setup lang="ts">
import { ref } from 'vue';
import { date } from '@/services/timeFunctions'
import BaseImage from '../../components/BaseImage.vue';

const emit = defineEmits(["remove", "edit"])
const iconActive = ref(false);
const props = defineProps({
  id: { type: Number, required: true },
  type: { type: Number, required: true },
  lang: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required:true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  seoMeta: { type: String, required: true },
  author: { type: Object, required: true },
  category: { type: Object, required: true },
  isTop: { type: Boolean, required: true },
  isMain: { type: Boolean, required: true },
  seoTitle: { type: String, required: true },
  seoDesc: { type: String, required: true },
  date: { type: Number, required: true },
  active: { type: Boolean, required: true },
  credit: { type: String, required: true  }
})
</script>

<template>
  <div class="bg-white-primary border-2 border-black-primary relative m-0" @mouseenter="iconActive = !iconActive" @mouseleave="iconActive = !iconActive">
    <div class="flex absolute top-3.5 right-3.5 z-10" v-if="iconActive">
      <router-link :to="{path: '/media', query: {item: JSON.stringify(props.id)}}" role="button" class="bg-yellow-secondary w-11 h-11 flex justify-center items-center rounded-full" >
        <i class="ri-pencil-line text-xl text-yellow-primary"></i>
      </router-link>
      <div role="button" class="bg-red-secondary w-11 h-11 flex justify-center items-center rounded-full ml-2.5" @click="emit('remove', props.id, props.title)">
        <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="relative">
        <BaseImage :src="props.image" class="w-100 h-68 object-cover object-center"/>
      </div>
      <div class="p-3.5">
        <p class="date"><i class="ri-time-line mr-2 text-base"></i>{{date(Number(props.date))}}</p>
        <p class="text-xl text-black-primary lines font-semibold">{{props.title}}</p>
        <p class="text-sm text-black-secondary lines">{{props.description}}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.lines {
  overflow: hidden;
  width:100%;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
}
</style>
