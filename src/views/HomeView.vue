<script setup>
import ItemView from '@/components/ItemView/index.vue'
</script>

<template>
  <div class="hero bg-accent rounded-b-full">
    <div class="hero-content text-center text-[#3A2424]">
      <div class="max-w-md md:max-w-screen-lg glass p-9 rounded-xl my-5">
        <h1 class="text-3xl md:text-5xl font-bold pacifico">Dewi Market</h1>
        <p class="pt-6 text-md md:text-lg">
          Pilih makanan favoritmu di sini dan dapatkan penawaran menarik untukmu.
          Dari manisan hingga makanan berat, kami memiliki berbagai pilihan untuk memenuhi kebutuhan kulinermu.
        </p>
      </div>
    </div>
  </div>
  <ItemView class="my-20"/>
</template>

<style scoped></style>
