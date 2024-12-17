<script setup>
defineOptions({
  name: 'CardItem',
})

const props = defineProps({
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

const addQuantity = () => {
  const quantity = document.getElementById('quantity' + props.id)
  quantity.innerHTML = parseInt(quantity.innerHTML) + 1
}

const deleteQuantity = () => {
  const quantity = document.getElementById('quantity' + props.id)
  if (quantity.innerHTML === '0') return
  quantity.innerHTML = parseInt(quantity.innerHTML) - 1
}
</script>

<template>
  <div class="card card-compact bg-base-100 w-56 md:w-72 shadow-xl">
    <figure>
      <img :src="img" :alt="label" />
    </figure>
    <div class="card-body">
      <div class="badge badge-accent badge-outline">{{category}}</div>
      <h2 class="card-title">{{ label }}</h2>
      <p class="text-gray-600 font-bold">{{ prices(price) }}</p>
      <div class="card-actions justify-between items-center flex flex-row">
        <button
          class="btn btn-accent"
          @click="buyItem(id, label, desc, img, prices(price))"
        >
          Buy Now
        </button>
        <div>
          <div class="flex flex-row items-center gap-2">
            <button class="btn btn-circle btn-xs btn-error" @click="deleteQuantity">
              <i class="pi pi-minus"></i>
            </button>
            <span class="text-2xl font-bold" :id="'quantity' + id">0</span>
            <button class="btn btn-circle btn-xs btn-accent" @click="addQuantity">
              <i class="pi pi-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
