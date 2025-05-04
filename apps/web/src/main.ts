// apps/web/src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './style.css'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faGoogle)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
