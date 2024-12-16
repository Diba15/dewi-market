<script setup>
import CardItem from '@/components/Item/index.vue'
import { computed, onMounted, ref } from 'vue'
import CustomButton from '@/components/Button/index.vue'
import { Notivue, Notification, pastelTheme, push, NotificationProgress } from 'notivue'

defineOptions({
  name: 'ItemView',
})

const meals = ref([])
const displayedMeals = ref([])
let limit = ref(10)
let offset = ref(0)
const render = ref(true)
const cart = JSON.parse(localStorage.getItem('cart')) || []

// Remove Duplicates
const cartWithoutDuplicates = cart.reduce((unique, o) => {
  if (!unique.some((obj) => obj.id === o.id)) {
    unique.push(o)
  }
  return unique
}, [])

// Re Render Component
function reRender() {
  render.value = !render.value
  setTimeout(() => {
    render.value = !render.value
  }, 100)
}

// Pagination
const hasMoreMeals = computed(() => meals.value.length > displayedMeals.value.length)

// Get Meals
if (localStorage.getItem('meals')) {
  meals.value = JSON.parse(localStorage.getItem('meals'))
  displayedMeals.value = meals.value.slice(0, limit.value)
} else {
  onMounted(async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`, {
      method: 'GET',
      mode: 'cors',
    })
    const data = await response.json()
    meals.value = data.meals
    meals.value.forEach((meal) => {
      meal.price = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000)
    })
    displayedMeals.value = meals.value.slice(0, limit.value)
    localStorage.setItem('meals', JSON.stringify(meals.value))
  })
}

// Load More Items
async function loadMore() {
  offset.value += limit.value
  displayedMeals.value = meals.value.slice(0, offset.value + limit.value)
  localStorage.setItem('meals', JSON.stringify(meals.value))
}

// Add Item into Cart
function buyItem(id, label, desc, img, price) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const quantity = document.getElementById('quantity' + id).innerHTML

    // Check if item already in cart, if quantity is different then update it.
    // Else show error
    if (cart.some((item) => item.id === id)) {
      if (cart.some((item) => item.id === id && item.quantity !== quantity)) {
        cart.forEach((item) => {
          if (item.id === id) {
            item.quantity = quantity
          }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        cartWithoutDuplicates.splice(0, cartWithoutDuplicates.length, ...cart)
        push.success(`${label} berhasil diperbarui di keranjang`)
        reRender()
        return
      } else {
        push.error('item sudah ada di keranjang')
        return
      }
    }

    if (parseInt(quantity) === 0) {
      push.error('jumlah item minimal 1')
      return
    }

    const item = {
      id: id,
      label: label,
      desc: desc,
      img: img,
      price: price,
      quantity: quantity,
    }

    cart.push(item)

    localStorage.setItem('cart', JSON.stringify(cart))

    console.log(JSON.stringify(cart))
    cartWithoutDuplicates.splice(0, cartWithoutDuplicates.length, ...cart)
    push.success(`${label} berhasil ditambahkan ke keranjang`)
    reRender()
  } catch (error) {
    console.error(error)
  }
}

const categoriesActive = ref('Dessert')

const changeCategory = (category) => {
  categoriesActive.value = category
}
</script>

<template>
  <div class="flex rounded-xl p-4 justify-center">
    <div class="flex items-center gap-4">
      <button
        class="py-2 px-4 border-2 border-accent hover:bg-accent hover:text-black active:scale-95 transition-all rounded-full"
        :class="{ 'bg-accent text-black': categoriesActive === 'Dessert' }"
        @click="changeCategory('Dessert')"
      >
        Dessert
      </button>
      <button
        class="py-2 px-4 border-2 border-accent hover:bg-accent hover:text-black active:scale-95 transition-all rounded-full"
        :class="{ 'bg-accent text-black': categoriesActive === 'Makanan' }"
        @click="changeCategory('Makanan')"
      >
        Makanan
      </button>
      <button
        class="py-2 px-4 border-2 border-accent hover:bg-accent hover:text-black active:scale-95 transition-all rounded-full"
        :class="{ 'bg-accent text-black': categoriesActive === 'Minuman' }"
        @click="changeCategory('Minuman')"
      >
        Minuman
      </button>
    </div>
  </div>

  <!-- Notification -->
  <Notivue v-slot="item">
    <Notification :item="item" :theme="pastelTheme">
      <NotificationProgress :item="item" />
    </Notification>
  </Notivue>

  <div class="divider divider-accent max-w-screen-xl mx-auto pacifico text-[#3A2424] text-2xl">
    Menu
  </div>

  <main class="p-4 flex flex-row flex-wrap w-full gap-4 justify-evenly lato">
    <CardItem
      v-for="item in displayedMeals"
      :key="item.idMeal"
      :id="item.idMeal"
      :price="item.price"
      :label="item.strMeal"
      :desc="item.strTags"
      :img="item.strMealThumb"
      :buy-item="buyItem"
    />
  </main>
  <div class="flex flex-col gap-4 py-5">
    <CustomButton
      label="Load More"
      @click="loadMore"
      v-if="hasMoreMeals"
      class="max-w-lg self-center"
    />
    <p class="max-w-lg self-center text-gray-600" v-else>Kamu Sampai Baris Terakhir!</p>
  </div>

  <!--  Action button  -->
  <div class="toast toast-end cursor-pointer">
    <RouterLink v-show="render" to="/cart" class="alert alert-success bg-accent rounded-full">
      <div class="flex items-center gap-4 font-bold">
        <i class="pi pi-shopping-cart"></i>
        <h1 class="text-md">
          Cart <span>({{ cartWithoutDuplicates.length }})</span>
        </h1>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
:root {
  /* Your variables */
  --header-height: 90px;
  --container-padding: 30px;
  --container-width: 1280px;

  /* Set the maximum width of the stream */
  --nv-root-width: var(--container-width);

  /* Add the top padding and place it below the header */
  --nv-root-top: calc(var(--header-height) + var(--container-padding));

  /* Add the same left-right paddings of your app container */
  --nv-root-left: var(--container-padding);
  --nv-root-right: var(--container-padding);

  --nv-root-x-align: right;
}

@media (max-width: 768px) {
  :root {
    --nv-root-x-align: center;
  }
}
</style>
