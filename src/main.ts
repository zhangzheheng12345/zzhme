import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import home from './components/home.vue'

import 'uno.css'

const routes = [{ path: '/', components: home }]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App).mount('#app')
