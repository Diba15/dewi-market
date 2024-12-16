<script setup>
defineOptions({
  name: 'CustomFooter',
})
</script>

<template>
  <footer class="footer footer-center bg-[#3A2424] text-base-content p-4">
    <aside>
      <p class="text-yellow-500">Copyright © {{ new Date().getFullYear() }} - All right reserved by <span class="pacifico">Dewi Market</span></p>
    </aside>
  </footer>
</template>

<style scoped></style>
