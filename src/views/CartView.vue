<script setup>
import CartItem from '@/components/CartItem/index.vue'
import CustomButton from '@/components/Button/index.vue'
import { Notification, NotificationProgress, Notivue, pastelTheme, push } from 'notivue'
import { ref } from 'vue'

const cart = JSON.parse(localStorage.getItem('cart')) || []
const render = ref(true)

// Re Render
function reRender() {
  render.value = !render.value
  setTimeout(() => {
    render.value = !render.value
  }, 100)
}

// Remove Duplicates
const cartWithoutDuplicates = cart.reduce((unique, o) => {
  if (!unique.some((obj) => obj.id === o.id)) {
    unique.push(o)
  }
  return unique
}, [])

// Update Quantity
function updateQuantity(id, quantity) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity = quantity
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    cartWithoutDuplicates.splice(0, cartWithoutDuplicates.length, ...updatedCart)
    reRender()
  } catch (error) {
    console.error(error)
  }
}

// Delete Item
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

// Total Price
const totalPrices = () => {
  let total = 0
  cartWithoutDuplicates.forEach((item) => {
    // Remove Rp. from price and convert to number
    const price = item.price.toString().replace('Rp', '').replace('.', '').trim()
    console.log(price)
    total += price * parseInt(item.quantity)
  })
  return total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)
}
</script>

<template>
  <!--  Checkout Button  -->
  <div
    class="flex flex-col gap-4 md:gap-0 md:flex-row w-full items-start md:items-center sticky top-0 justify-between bg-accent p-4"
  >
    <div>
      <h1 class="text-2xl font-bold text-[#3A2424]">Ringkasan Keranjang</h1>
      <p class="text-[#3A2424] font-semibold" v-show="render">
        Total Harga:
        {{ totalPrices() }}
      </p>
    </div>
    <CustomButton
      onclick="my_modal_1.showModal()"
      :label="'Checkout (' + cartWithoutDuplicates.length + ')'"
      class="w-full btn-neutral max-w-52 self-end md:self-auto"
    />
  </div>

  <!-- Open the modal using ID.showModal() method -->
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Konfirmasi Pembelian</h3>
      <div class="flex justify-between" v-for="item in cartWithoutDuplicates" :key="item.id">
        <p>{{item.label}} x {{item.quantity}}</p>
        <p>{{item.price}}</p>
      </div>
      <p class="text-end font-bold pt-5">Total Harga: {{totalPrices()}}</p>
      <div class="modal-action">
        <form method="dialog" class="flex gap-5">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Cancel</button>
          <button class="btn btn-accent"><i class="pi pi-whatsapp"></i> Checkout</button>
        </form>
      </div>
    </div>
  </dialog>

  <main class="p-4 flex flex-col flex-wrap gap-4 min-h-svh">
    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme">
        <NotificationProgress :item="item" />
      </Notification>
    </Notivue>


    <div
      class="w-full hidden md:flex flex-row items-center justify-between p-4 shadow rounded-xl"
    >
      <h1 class="font-bold">Produk</h1>
      <div class="flex flex-row gap-10 justify-between pe-10">
        <h1 class="font-bold">Harga</h1>
        <h1 class="font-bold">Jumlah</h1>
      </div>
    </div>

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
      :updatedQuantity="updateQuantity"
    />
    <p class="text-center text-gray-600" v-if="cartWithoutDuplicates !== 0">
      Makanan kamu kurang banyak nih :)
    </p>

  </main>
</template>

<style scoped></style>
