<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
})
</script>
<template>
  <tr class="rounded m-0" v-if="props.id !== undefined">
      <td class="text-black-primary font-semibold">{{props.id}}</td>
      <td class="text-sm lines text-black-secondary">{{props.url}}</td>
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
