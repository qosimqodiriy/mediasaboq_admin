<script setup lang="ts">
import links from './links.json';
const src = ['icon-category', 'icon-book', 'icon-video', 'icon-question', 'icon-article', 'icon-image', 'icon-person', 'icon-disciple', 'icon-comment', 'icon-folder', 'icon-building', 'icon-university', 'icon-forum', 'icon-award', 'icon-organization', 'icon-work', 'icon-link']
</script>

<template>
  <aside class="text-white-primary p-4  bg-black-dark fixed top-0 bottom-0 overflow-y-auto">
      <div role="button">
        <h2 class="font-vibes text-3xl text-green-primary">media<span class="text-orange-primary">saboq</span></h2>
      </div>
      <div class="text-sm font-medium pt-8 w-100">
        <router-link v-for="link in links.links" :to="link.path" :key="link.path" class="py-3.5 flex" active-class="router-link-active">
          <i :class="link.icon" class="text-gray-icon"></i>
          <p class="px-2.5 text-sm font-medium">{{link.content}}</p>
        </router-link>
      </div>
    </aside>
</template>

<style scoped>

aside {
  width: 220px;
  min-width: 220px;
}
i {
  color: #C4C4C4;
}
.router-link-active i{
  color: #FF6300;
}

.router-link-active p {
  color: #ff6300;
}
</style>