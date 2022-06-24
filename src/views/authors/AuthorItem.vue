<script setup lang="ts">
// import { date } from '@/services/timeFunctions'
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
  username: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
</script>
<template>
  <tr class="rounded m-0">
      <td class="text-black-secondary">{{props.id}}</td>
      <td class="text-black-primary font-semibold"><p class="lines">{{props.name}}</p></td>
      <td class="text-sm text-black-secondary"><p class="lines">{{props.username}}</p></td>
      <td class="flex">
        <div role="button" class="bg-red-secondary w-11 h-11 flex justify-center items-center rounded-full mr-2.5" @click="emit('remove', props.id, props.name)">
          <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
        </div>
        <div @click="emit('edit', props)" role="button" class="bg-gray-primary w-11 h-11 flex justify-center items-center rounded-full" >
          <i class="ri-arrow-right-line text-xl text-black-primary"></i>
        </div>
    </td>
  </tr>
</template>
<style scoped>
.lines {
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  width:100px;
}
</style>
