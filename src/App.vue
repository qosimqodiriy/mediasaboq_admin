<script setup lang="ts">
import router from '@/router'
import { reactive, defineAsyncComponent } from 'vue';
const Sidebar = defineAsyncComponent(() =>
  import('@/components/sidebar/index.vue')
)
const data = reactive<{token: string | null}>({
  token: null
})
function handleUser() {
  // @ts-ignore:next-line
  data.token = sessionStorage.getItem('token')
  if (data.token === null) {
    router.push('/login')
    setTimeout(handleUser, 100)
  }
}
handleUser()
</script>

<template>
  <div class="flex">
    <sidebar/>
    <router-view />
  </div>
  <delete-modal />
  <base-loading />
  <base-notification />
</template>
