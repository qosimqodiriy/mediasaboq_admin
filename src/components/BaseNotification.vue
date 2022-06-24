<script setup lang="ts">
import { _toast } from '@/store/theToast'
</script>
<template>
<teleport to="body">
  <div v-if="_toast.visible" class="fixed w-screen flex justify-center left-0 bottom-0 mb-8">
    <div class="text-green-secondary rounded-2xl flex bg-white-primary border border-green-secondary p-3.5 shadow-lg">
          <div class="bg-green-light p-3 rounded-full">
            <img src="@/assets/images/tick.svg" alt="">
          </div>
          <div class="justify-self-center self-center px-3.5">
          <p class="text-base font-sans">{{_toast.text}}</p>
      </div>
    </div>
  </div>
</teleport>
</template>
