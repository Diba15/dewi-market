<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'CartItem',
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
    required: true,
  },
  updatedQuantity: {
    type: Function,
    required: true,
  },
})

const isDelete = ref(false)
const isDisable = ref(false)

const addQuantity = () => {
  try {
    const quantity = document.getElementById('quantity' + props.id)
    quantity.innerHTML = parseInt(quantity.innerHTML) + 1
    props.updatedQuantity(props.id, quantity.innerHTML)
    isDisable.value = true
  } catch (error) {
    if (error) {
      props.updatedQuantity(props.id)
    }
  }

  setTimeout(() => {
    isDisable.value = false
  }, 1000)
}

const deleteQuantity = () => {
  try {
    const quantity = document.getElementById('quantity' + props.id)
    if (parseInt(quantity.innerHTML) === 1) {
      isDelete.value = true
      return
      // props.onClick(props.id)
    }
    quantity.innerHTML = parseInt(quantity.innerHTML) - 1
    props.updatedQuantity(props.id, quantity.innerHTML)
    isDisable.value = true
  } catch (error) {
    console.error(error)
  }

  setTimeout(() => {
    isDisable.value = false
  }, 1000)
}

const confirmDelete = () => {
  isDelete.value = false
  props.onClick(props.id)
}

const cancelDelete = () => {
  isDelete.value = false
}
</script>

<template>
  <div v-show="isDelete" :key="props.id" role="alert" class="alert alert-warning">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <span>Apakah kamu yakin untuk menghapus {{label}} ini?</span>
    <div class="flex flex-row gap-5">
      <button class="btn btn-sm" @click="cancelDelete">Deny</button>
      <button class="btn btn-sm btn-error" @click="confirmDelete">Accept</button>
    </div>
  </div>

  <div class="flex flex-row justify-between shadow rounded-xl h-fit md:h-32 p-4">
    <div class="flex flex-col md:flex-row gap-4 w-full items-center justify-center">
      <img :src="img" :alt="label" class="h-48 md:h-24 w-48 md:w-24" />
      <div class="flex flex-col md:flex-row items-center justify-between w-full">
        <h1 class="font-bold">{{ label }}</h1>
        <div class="flex flex-col md:flex-row gap-10 items-start md:items-center">
          <h1>{{ price }}</h1>
          <div
            class="flex flex-row items-center gap-2"
            :class="{ 'pointer-events-none': isDisable }"
          >
            <button class="btn btn-circle btn-xs btn-accent" @click="deleteQuantity">
              <i class="pi pi-minus"></i>
            </button>
            <span class="text-2xl font-bold" :id="'quantity' + id">{{ quantity }}</span>
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
