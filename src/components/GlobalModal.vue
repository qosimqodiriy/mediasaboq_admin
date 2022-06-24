<script setup lang="ts">
</script>

<template>
<teleport to='body'>
    <div class="w-screen h-full overflow-auto bg-white-secondary items-start flex justify-center fixed top-0 right-0">
        <!-- Modal Content -->
        <slot/>
    </div>
</teleport>
</template>
