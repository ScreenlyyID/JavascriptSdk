import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'materialize-css/dist/css/materialize.min.css'
import './assets/progress-circle.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
