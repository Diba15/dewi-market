<script setup>
import CardItem from '@/components/Item/index.vue'
import { computed, nextTick, ref } from 'vue'
import CustomButton from '@/components/Button/index.vue'
import { Notivue, Notification, pastelTheme, push, NotificationProgress } from 'notivue'

defineOptions({
  name: 'ItemView',
})

const meals = ref([])
const displayedMeals = ref([])
const popularMeals = ref([])
const localCategories = localStorage.getItem('categories')
const categoriesActive = ref('Dessert')
try {
  categoriesActive.value = JSON.parse(localStorage.getItem('categories'))
} catch {
  categoriesActive.value = 'Dessert'
}
let limit = ref(10)
let offset = ref(0)
const render = ref(true)
const isLoading = ref(true)
const cart = JSON.parse(localStorage.getItem('cart')) || []

if (!localCategories) {
  localStorage.setItem('categories', JSON.stringify('Dessert'))
}

const categories = [
  {
    str: 'Dessert',
    code: 'Dessert',
  },
  {
    str: 'Ayam',
    code: 'Chicken',
  },
  {
    str: 'Daging Sapi',
    code: 'Beef',
  },
  {
    str: 'Seafood',
    code: 'Seafood',
  },
]

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

// Get Meals from
async function getMeals(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, {
    method: 'GET',
    mode: 'cors',
  })
  const data = await response.json()
  meals.value = data.meals
  meals.value.forEach((meal) => {
    meal.price = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000)
    meal.category = category
  })
  displayedMeals.value = meals.value.slice(0, limit.value)
  localStorage.setItem('meals', JSON.stringify(meals.value))

  popularMeals.value = displayedMeals.value.sort(() => 0.5 - Math.random()).slice(0, 4)
  localStorage.setItem('popularMeals', JSON.stringify(popularMeals.value))

  await nextTick()
  console.log(displayedMeals.value)
}

// Get Meals in local storage for fast load
if (localStorage.getItem('meals')) {
  isLoading.value = false
  meals.value = JSON.parse(localStorage.getItem('meals'))
  displayedMeals.value = meals.value.slice(0, limit.value)

  popularMeals.value = displayedMeals.value.sort((a, b) => b.price - a.price).slice(0, 4)
  localStorage.setItem('popularMeals', JSON.stringify(popularMeals.value))

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
} else {
  getMeals(categoriesActive.value.toString())
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

    const quantity = 1

    // Check if item already in cart, if quantity is different then update it.
    // Else show error
    if (cart.some((item) => item.id === id)) {
      cart.forEach((item) => {
        if (item.id === id) {
          item.quantity += 1
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      cartWithoutDuplicates.splice(0, cartWithoutDuplicates.length, ...cart)
      push.success(`${label} berhasil diperbarui di keranjang`)
      reRender()
      return
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

const changeCategory = (category) => {
  try {
    categoriesActive.value = category
    localStorage.setItem('categories', JSON.stringify(category))
    localStorage.setItem('meals', JSON.stringify([]))
    displayedMeals.value = []
    isLoading.value = true

    console.log(category)
    getMeals(category)

    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex rounded-xl p-4 justify-center transition-all duration-300 fade-from-top">
    <!--  Categories  -->
    <div class="flex flex-wrap justify-center items-center gap-4">
      <button
        v-for="category in categories"
        :key="category.str"
        class="py-2 px-4 border-2 border-accent hover:bg-accent hover:text-black active:scale-95 transition-all rounded-full"
        :class="{ 'bg-accent text-black': categoriesActive === category.code }"
        @click="changeCategory(category.code)"
      >
        {{ category.str }}
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
    Menu Populer
  </div>

  <!-- Popular Meals -->
  <div class="p-4 flex flex-row flex-wrap w-full gap-4 justify-evenly lato">
    <!--  Loading  -->
    <div v-if="isLoading" class="flex flex-row gap-4 justify-evenly w-full">
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>
    <!--  Meals  -->
    <CardItem
      v-for="item in popularMeals"
      v-show="!isLoading"
      :key="item.idMeal"
      :id="item.idMeal"
      :price="item.price"
      :label="item.strMeal"
      :desc="item.strTags"
      :img="item.strMealThumb"
      :category="item.category"
      :buy-item="buyItem"
    />
  </div>

  <div class="divider divider-accent max-w-screen-xl mx-auto pacifico text-[#3A2424] text-2xl">
    Menu
  </div>

  <!-- Meals -->
  <main class="p-4 flex flex-row flex-wrap w-full gap-4 justify-evenly lato">
    <!--  Loading  -->
    <div v-if="isLoading" class="flex flex-row gap-4 justify-evenly w-full">
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
      <div class="flex justify-center w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>
    <!--  Meals  -->
    <CardItem
      v-for="item in displayedMeals"
      v-show="!isLoading"
      :key="item.idMeal"
      :id="item.idMeal"
      :price="item.price"
      :label="item.strMeal"
      :desc="item.strTags"
      :img="item.strMealThumb"
      :category="item.category"
      :buy-item="buyItem"
    />
  </main>
  <!--  Load More  -->
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
      <div class="flex items-center gap-2 font-bold justify-center">
        <i class="pi pi-shopping-cart"></i>
        <h1 class="text-md">
          Keranjang <span>({{ cartWithoutDuplicates.length }})</span>
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

.fade-from-top {
  animation-name: fade-from-top;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fade-from-top {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
