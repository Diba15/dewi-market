import{ref, computed} from "vue"
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('cupcake')
  localStorage.setItem('theme', theme.value)
  const isDark = computed(() => theme.value === 'night')
  return { theme, isDark }
})
