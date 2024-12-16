<script setup>
import CartItem from '@/components/CartItem/index.vue'
import CustomButton from '@/components/Button/index.vue'
import { Notification, NotificationProgress, Notivue, pastelTheme, push } from 'notivue'
import { ref } from 'vue'

const cart = JSON.parse(localStorage.getItem('cart')) || []
const render = ref(true)

function reRender() {
  render.value = !render.value
  setTimeout(() => {
    render.value = !render.value
  }, 100)
}

const cartWithoutDuplicates = cart.reduce((unique, o) => {
  if (!unique.some((obj) => obj.id === o.id)) {
    unique.push(o)
  }
  return unique
}, [])

function deleteItem(id) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const updatedCart = cart.filter((item) => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    cartWithoutDuplicates.splice(0, cartWithoutDuplicates.length, ...updatedCart)

    push.success('Berhasil Dihapus')
    reRender()
  } catch (error) {
    push.error('gagal dihapus ' + error)
  }
}
</script>

<template>
  <main class="p-4 flex flex-col flex-wrap gap-4">
    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme">
        <NotificationProgress :item="item" />
      </Notification>
    </Notivue>

    <p v-if="cartWithoutDuplicates.length === 0" class="text-center text-gray-600">
      Keranjang kosong
    </p>
    <CartItem
      v-else
      v-for="item in cartWithoutDuplicates"
      v-show="render"
      :key="item.id"
      :id="item.id"
      :img="item.img"
      :price="item.price"
      :desc="item.desc"
      :label="item.label"
      :quantity="item.quantity"
      :onClick="deleteItem"
    />

    <!--  Checkout Button  -->
    <CustomButton :label="'Checkout (' + cartWithoutDuplicates.length + ')'" class="w-full" />
  </main>
</template>

<style scoped></style>
