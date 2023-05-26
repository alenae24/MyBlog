import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import './assets/img/style.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
