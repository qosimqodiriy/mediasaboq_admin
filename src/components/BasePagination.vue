<script setup lang="ts">
import {reactive, watch, computed} from 'vue';
const props = defineProps({
  active: {
    type: Number,
    required: true
  },
  items: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
});
const data = reactive<{page: number, active: number, perPage: number, pages: number[]}>({
  page: 1,
  active: props.active,
  perPage: props.perPage,
  pages: [],
});
const pages = computed(() => {
  data.pages = [];
  let numberOfPages = Math.ceil(props.items / data.perPage);
  for (let i = 1; i <= numberOfPages; i++) {
    data.pages.push(i);
  }
  return data.pages
})
watch(props, () => {
  if (props.active == 1) {
    data.active = 1
  }
})
function toggleActive(val: number): void {
  data.active = val
  emit("change", val)
}

const emit = defineEmits(["change"]);
</script>

<template>
    <div class="flex my-8">
      <button v-if="pages.length > 0"  class="w-11 h-11 rounded mr-2.5" :class="data.active === 1 ? 'bg-orange-primary text-white-primary': 'bg-white-primary text-black-primary'" @click="data.page = 1; toggleActive(1)">
        1
      </button>
      <button v-if="(data.active === 1 || data.active === 2 || data.active === pages.slice(-2)[0] || data.active === pages.slice(-1)[0]) && pages.length > 2" @click="data.page = 2; toggleActive(2)" class="w-11 h-11 rounded mr-2.5" :class="data.active === 2 ? 'bg-orange-primary text-white-primary': 'bg-white-primary text-black-primary'">
        2
      </button>
      <button v-if="data.active > 3 && pages.length > 4"  class="w-11 h-11 rounded mr-2.5 bg-white-primary text-black-primary" @click="data.page = data.page - 2; toggleActive(data.page)">
        ...
      </button>
      <button v-if="data.active === 2 && pages.length > 4" class="w-11 h-11 rounded mr-2.5 bg-white-primary text-black-primary"  @click="data.page = 3; toggleActive(3)">
        3
      </button>
      <button v-if="data.active > 2 && data.active !== pages.slice(-1)[0] && data.active !== pages.slice(-2)[0]" class="w-11 h-11 rounded mr-2.5 bg-white-primary text-black-primary" @click="toggleActive(data.active - 1); data.page= data.page - 1">
        {{data.active - 1}}
      </button>
      <button v-if="data.active > 2 && data.active !== pages.slice(-1)[0] && data.active !== pages.slice(-2)[0]" @click="toggleActive(data.active); data.page = data.active" class="w-11 h-11 rounded mr-2.5 bg-orange-primary text-white-primary">
        {{data.active}}
      </button>
      <button v-if="data.active > 2 && data.active !== pages.slice(-1)[0] && data.active !== pages.slice(-2)[0]" class="w-11 h-11 rounded mr-2.5 bg-white-primary text-black-primary" @click="toggleActive(data.active + 1); data.page = data.page + 1">
        {{data.active + 1}}
      </button>
      <button v-if="data.active < pages.slice(-3)[0] && pages.length > 4"  class="w-11 h-11 rounded mr-2.5 bg-white-primary text-black-primary" @click="data.page = data.page + 2; toggleActive(data.page)">
        ...
      </button>
      <button v-if="data.active === pages.slice(-2)[0] && pages.length > 4" class="w-11 h-11 rounded mr-2.5" :class="data.active === 3 ? 'bg-orange-primary text-white-primary': 'bg-white-primary text-black-primary'" @click="data.page = pages.slice(-3)[0]; toggleActive(pages.slice(-3)[0])">
        {{pages.slice(-3)[0]}}
      </button>
      <button v-if="(data.active === 1 || data.active === 2 || data.active === pages.slice(-2)[0] || data.active === pages.slice(-1)[0]) && pages.length > 3" @click="data.page = pages.slice(-2)[0]; toggleActive(pages.slice(-2)[0])" class="w-11 h-11 rounded mr-2.5" :class="data.active === pages.slice(-2)[0] ? 'bg-orange-primary text-white-primary': 'bg-white-primary text-black-primary'">
        {{pages.slice(-2)[0]}}
      </button>
      <button v-if="pages.length > 1" class="w-11 h-11 rounded mr-2.5" :class="data.active === pages.slice(-1)[0] ? 'bg-orange-primary text-white-primary': 'bg-white-primary text-black-primary'" @click="data.page = pages.slice(-1)[0]; toggleActive(pages.slice(-1)[0])">
        {{pages.slice(-1)[0]}}
      </button>
    </div>
</template>