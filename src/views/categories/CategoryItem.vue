<script setup lang="ts">
import { ref } from 'vue';
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
  articleCount: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="bg-white-primary rounded relative p-3.5 m-0" @mouseenter="iconActive = !iconActive" @mouseleave="iconActive = !iconActive">
    <div class="flex absolute top-3.5 right-3.5 z-10" v-if="iconActive">
      <div @click="emit('edit', props)" role="button" class="bg-yellow-secondary w-11 h-11 flex justify-center items-center rounded-full" >
        <i class="ri-pencil-line text-xl text-yellow-primary"></i>
      </div>
      <div role="button" class="bg-red-secondary w-11 h-11 flex justify-center items-center rounded-full ml-2.5" @click="emit('remove', props.id, props.name)">
        <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
      </div>
    </div>
    <div class="flex overflow-hidden">
      <BaseImage :src="props.image" class="h-11.5 w-11.5 object-cover rounded mr-3.5"/>
      <div class="w-full">
         <p class="text-xl text-black-primary lines font-semibold">{{props.name}}</p>
        <p class="text-sm text-black-secondary">{{props.articleCount}} ta maqola bor</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.lines {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  max-width: 220px;
}
</style>
