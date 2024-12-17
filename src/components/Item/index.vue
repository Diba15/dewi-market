<script setup>
defineOptions({
  name: 'CardItem',
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
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  buyItem: {
    type: Function,
    required: true,
  },
})

const prices = (price) => {
  let prices = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
  prices = prices.slice(0, -3)
  return prices
}
</script>

<template>
  <div class="card card-compact bg-base-100 w-36 md:w-72 shadow-xl">
    <figure>
      <img :src="img" :alt="label" />
    </figure>
    <div class="card-body">
      <div class="badge badge-accent badge-outline">{{category}}</div>
      <h2 class="card-title text-md md:text-xl">{{ label }}</h2>
      <p class="text-gray-600 font-bold">{{ prices(price) }}</p>
      <div class="card-actions justify-end items-center flex flex-row">
        <button
          class="btn btn-accent btn-sm md:btn-md"
          @click="buyItem(id, label, desc, img, prices(price))"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
