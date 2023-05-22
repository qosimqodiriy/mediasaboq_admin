<script setup lang="ts">
import { ref } from 'vue';
import { date } from '../../services/timeFunctions'

const emit = defineEmits(["remove", "edit"])
const iconActive = ref(false);
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
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
      <div role="button" class="bg-red-secondary w-11 h-11 flex justify-center items-center rounded-full ml-2.5" @click="emit('remove', props.id, props.url)">
        <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
      </div>
    </div>
    <div class="flex items-center">
      <base-image :src="props.icon" alt="image" class="w-12 h-12 rounded object-cover bg-black-secondary p-2"/>
      <p class="text-normal lines text-black-primary ml-3.5">{{props.url}}</p>
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
