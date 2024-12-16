<script setup>
defineOptions({
  name: 'CustomButton',
})

defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button class="btn btn-accent">{{label}}</button>
</template>

<style scoped>

</style>
