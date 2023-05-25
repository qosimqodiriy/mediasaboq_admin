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
  countArticle: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <tr class="rounded m-0" v-if="props.name !== undefined">
      <td class="text-black-primary lines font-semibold">{{props.name}}</td>
      <td class="text-sm text-black-secondary">{{props.countArticle? props.countArticle : 0}}</td>
      <td class="flex">
        <div @click="emit('edit', props)" role="button" class="bg-yellow-secondary w-11 h-11 flex justify-center items-center rounded-full" >
          <i class="ri-pencil-line text-xl text-yellow-primary"></i>
        </div>
        <div role="button" class="bg-red-secondary w-11 h-11 flex justify-center items-center rounded-full ml-2.5" @click="emit('remove', props.id, props.name)">
          <i class="ri-delete-bin-6-line text-xl text-red-primary"></i>
        </div>
    </td>
  </tr>
</template>
<style scoped>
.lines {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:100%;
}

tr {
  height: 75px;
  /* display: flex; */
  justify-items: start;
}
</style>
