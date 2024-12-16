<script setup>
import { RouterView } from 'vue-router'
import CustomNavbar from '@/components/Navbar/index.vue'
import CustomFooter from '@/components/Footer/index.vue'
</script>

<template>
  <div data-theme="lemonade">
    <!--  Navbar  -->
    <header>
      <div class="wrapper">
        <CustomNavbar />
      </div>
    </header>

    <!--  View  -->
    <RouterView class="min-h-svh" />
  </div>

  <!-- Footer -->
  <CustomFooter />
</template>

<style scoped></style>
