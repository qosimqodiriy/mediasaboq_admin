<script setup lang="ts">
import { handleAuth } from "@/services/common";
import { reactive } from "@vue/reactivity";
import router from '@/router'
const data = reactive<{username: string, password: string, passwordError: string}>({
  username: '',
  password: '',
  passwordError: '',
})

function handleSubmit() {
  // if (data.password.length < 8) {
  //   data.passwordError = 'Parol 8 ta belidan kam emas'
  //   setTimeout(() => {
  //     data.passwordError = ''
  //   }, 3000)
  // }
  // if (!/\d/.test(data.password)) {
  //   data.passwordError = 'Parolda kamida bitta son bor'
  //   setTimeout(() => {
  //     data.passwordError = ''
  //   }, 3000)
  // }
  // if (!/[A-Z]+/.test(data.password)) {
  //   data.passwordError = 'Parolda kamida bitta bosh harf bor'
  //   setTimeout(() => {
  //     data.passwordError = ''
  //   }, 3000)
  // }
  // if (data.password === data.username) {
  //   data.passwordError = 'Parol va foydalanuvchi nomi turli xil'
  //   setTimeout(() => {
  //     data.passwordError = ''
  //   }, 3000)
  // }
  // if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.password)) {
  //   data.passwordError = 'Parolda kamida bitta maxsus belgi bor'
  //   setTimeout(() => {
  //     data.passwordError = ''
  //   }, 3000)
  // }
  if (data.passwordError === '') {
    handleAuth(data).then(res => {
    if (res[0] === null) {
      // @ts-ignore:next-line
      sessionStorage.setItem('token', res[1].token)
      router.push('/')
    } else {
      data.passwordError = 'Parol yoki foydalanuvchi nomi xato'
      setTimeout(() => {
        data.passwordError = ''
      }, 3000)
      router.push('/login')
    }
  })
  }
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center login z-10">
    <div class="mp4">
      <video autoplay loop muted src="@/assets/videos/background.mp4"></video>
    </div>
    <div class="bg-white-primary p-8 rounded-2xl w-99">
      <form action="" method="post" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <h2 class="font-vibes text-3xl text-green-primary">media<span class="text-orange-primary">saboq</span></h2>
          <p v-if="data.passwordError !== ''" class="text-red-primary mb-3">{{data.passwordError}}</p>
          <div class="w-full relative">
            <input class="w-full rounded text-sm leading-4 text-black-secondary border border-gray-secondary focus:outline-none bg-gray-primary h-11.5 px-5 py-3" v-model="data.username" type="text" name="username" id="username" required autofocus  autocomplete="off">
            <label class="label transition-all text-sm leading-4 w-full text-black-secondary absolute top-3.5 left-6" for="username">Foydalanuvchi</label>
          </div>
          <div class="w-full relative mt-3.5">
            <input class="w-full rounded text-sm leading-4 text-black-secondary border border-gray-secondary focus:outline-none bg-gray-primary h-11.5 px-5 py-3" v-model="data.password" type="password" name="password" id="password" required autofocus>
            <label class="label transition-all text-sm leading-4 w-full text-black-secondary absolute top-3.5 left-6" for="password">Parol</label>
          </div>
        </div>
        <button class="px-8 mt-8 py-3.5 bg-orange-primary text-white-primary rounded" type="submit">Tizimga kirish</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
input:focus + label,
input:valid + label{
  top: 10px;
  font-size: 8px;
  line-height: 10px;
}

.login {
  background-color: #e4e4e4;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

.mp4 {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
}

.mp4 video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>