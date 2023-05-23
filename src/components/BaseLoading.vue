<script setup lang="ts">
import { _loading } from '@/store/theLoading'
</script>

<template>
  <div v-if="_loading.visible" class="main absolute w-full top-0 right-0 h-screen z-50 bg">
    <div class="self-center top-50 left-50 absolute -translate-x-1/2 -translate-y-1/2">
      <div class="animate-spin text-6xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70" height="70">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" fill="rgba(255,99,0,1)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  /* backdrop-filter: blur(1px); */
  background: rgba(234, 234, 234, 0.3);
}

svg {
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