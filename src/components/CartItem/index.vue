<script setup>
defineOptions({
  name: 'CartItem',
})
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-row justify-between bg-accent rounded-xl h-32 p-4">
    <div class="flex flex-row gap-4">
      <img :src="img" :alt="label">
      <div class="flex flex-col justify-center">
        <h1 class="font-bold">{{ label }} - {{ quantity }}</h1>
        <h1>{{price}}</h1>
      </div>
    </div>
    <div class="flex flex-row gap-4 items-center">
      <button class="btn btn-error bg-red-500 hover:bg-red-600 pi pi-trash" @click="onClick(id)"></button>
    </div>
  </div>
</template>

<style scoped>

</style>
