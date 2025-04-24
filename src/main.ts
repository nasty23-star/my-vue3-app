import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const theme =
  (localStorage.getItem('theme') as 'dark' | 'light' | null) ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

document.documentElement.classList.add(theme)
createApp(App).mount('#app')
