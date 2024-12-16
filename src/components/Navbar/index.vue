<script setup>
defineOptions({
  name: 'CustomNavbar',
})
</script>

<template>
  <div class="drawer pacifico text-[#3A2424]">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-accent w-full">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">
          <img src="/icon.png" alt="" class="h-12">
          <h1 class="text-2xl showIcon transition-all">Dewi Market</h1>
        </div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal items-center">
            <!-- Navbar menu content here -->
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">About</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.showIcon {
  animation: showIcon 1s ease-in-out;
}

@keyframes showIcon {
  from {
    transform: translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
