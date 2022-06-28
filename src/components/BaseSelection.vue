<script lang="ts" setup>
  import { getSelections_API, postSelections_API } from '@/services/common';
  import { onMounted, reactive, ref } from 'vue';
  const props = defineProps({
  url: {
    type: String,
    reuired: true
  },
  title: {
    type: String,
    required: true
    },
    lang: {
      type: String,
      required: true
    }
  })
const scrollableElement = ref()
const lastElement = ref()
const emit = defineEmits(['select'])
const data = reactive<{offset: number, searchOffset:number, loading: boolean, count:number, list: any[], visible: boolean, value?: {name?: string}, query:  string}>({
  offset: 0,
  searchOffset: 0,
  loading: false,
  count: 0,
  list: [],
  visible: false,
  query: '',
  })
async function loadSelections() {
    if (data.offset <= data.count && data.query == '') {
      if (data.offset === 0) {
        data.list = []
      }
      data.loading = true
      const [error, response] = await getSelections_API(data.offset, String(props.url))
      data.loading = false
      if (response.data.list) {
        data.list = [
        ...data.list,
        ...response.data.list
      ]
      data.count = response.data.count
      data.offset = data.offset + 10
      data.searchOffset = 0;
      } else {
        data.list = []
      }
    }
    else if (data.query != '' && data.searchOffset <= data.count) {
      if (data.searchOffset === 0) {
        data.list = []
      }
      data.loading = true
      const [error, response] = await getSelections_API(data.searchOffset, String(props.url), data.query)
      if (response.data.list) {
        data.loading = false
        data.list = [
        ...data.list,
        ...response.data.list
      ]
      data.count = response.data.count
      data.searchOffset = data.searchOffset + 10
      data.offset = 0
      } else {
        data.list = []
      }
    }
  }

  function handleScroll() {
    let height = scrollableElement.value.getBoundingClientRect().bottom
    let childHeight = lastElement.value.getBoundingClientRect().bottom
    if (height - childHeight === 2) {
      loadSelections()
    }
  }

  async function createNewElement() {
    const [error, response] = await postSelections_API({ name: data.query, lang: props.lang }, String(props.url))
    // oxiirgi qo'shilhgan elementni olish kerak
    emit('select', {name: response.name, lang: props.lang, id: response.id })
    console.log(response)  
    
    data.query = ''
    data.visible = !data.visible
    }
  onMounted(() => {
    loadSelections()
  })
</script>

<template>
  <ul class="menu">
    <li class="dropdown w-100 dropdown-6 text-black-primary">
      <div  class="flex justify-between items-center w-100 w-full" role="button" @click="data.visible = !data.visible">
        <span>{{data.value == null ? props.title : data.value.name}}</span>
        <i class="ri-arrow-up-s-line" v-if="data.visible"></i>
        <i class="ri-arrow-down-s-line" v-if="!data.visible"></i>
      </div>
    </li>
    <ul :style="{ height: data.list.length + 'px', maxHeight: '300px'}" class="dropdown-menu dropdown_menu--animated dropdown_menu-6 bg-gray-primary" ref="scrollableElement" :class="data.visible ? 'block': 'none'" @scroll="handleScroll">
      <input type="search" role="button" placeholder="Qidiruv"  class="search px-4 focus:outline-none" v-model="data.query" @input="loadSelections" @keypress.enter.prevent="createNewElement()" required>
      <div v-for="(item, i) in data.list" :key="i" ref="lastElement" @click="data.value = item">
        <li role="button" v-if="data.list.length == i + 1" @click="data.value = item; emit('select', item); data.visible = !data.visible" class="bg-gray-primary px-4">
          {{item.name}}
        </li>
      </div>
      <div v-for="(item, i) in data.list" :key="i" ref="lastElement" @click="data.value = item">
        <li role="button" v-if="data.list.length !== i + 1" @click="data.value = item; emit('select', item); data.visible = !data.visible" class="bg-gray-primary px-4">
          {{item.name}}
        </li>
      </div>
      <li v-if="data.loading" class="bg-gray-primary">
        <i class="ri-loader-4-fill text-gray-secondary"></i>
      </li>
    </ul>
  </ul>
</template>
<style scoped>
.ri-loader-4-fill {
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
.w-100 {
  height: 51px;
}
.menu {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.dropdown {
  padding: 0 20px;
  display: flex;
  align-items: center;
  border: 1px solid #e4e4e4;
  width: 100%;
  background: #f4f4f4;
  border-radius: 5px;
  position: relative;
  font-size: 14px;
  perspective: 1000px;
}

.search {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #e4e4e4;
  width: 100%;
  height: 40px;
}

.block {
  display: block;
}

.none {
  display: none;
}
.dropdown_menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #e4e4e4;
  border-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  perspective: 1000px;
  overflow-y: scroll;
  background-color: #f4f4f4;
  z-index: 99;
}
.dropdown_menu li {
  /* display: none; */
  background-color: #f4f4f4;
  padding: 10px 20px;
  height: 40px;
  font-size: 16px;
  /* opacity: 0; */
  z-index: 100;
}
.dropdown_menu li:hover {
  background-color: #c4c4c4;
  color: #f4f4f4;
}
.dropdown_menu--animated li {
  display: block;
  opacity: 1;
}
.dropdown_menu-6 {
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
}

@keyframes growDown {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>