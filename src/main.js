import './assets/main.css'
import 'primeicons/primeicons.css'
import 'notivue/notification.css' // Only needed if using built-in notifications
import 'notivue/animations.css' // Only needed if using built-in animations
import 'notivue/notification-progress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNotivue } from 'notivue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const notivue = createNotivue(/* options */)

app.use(createPinia())
app.use(router)
app.use(notivue)

app.mount('#app')
