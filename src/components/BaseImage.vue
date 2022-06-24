<script setup lang="ts">
const url = import.meta.env.VITE_BASE_URL2
const props = defineProps({
  src: {
    String,
    required: true
  }
})
</script>
<template>
  <img :src="`${url}${props.src}`" alt="">
</template>