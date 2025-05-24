// apps/web/src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import { api } from '@/services/api'
import './style.css'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { useAuthStore } from '@/stores/auth'

library.add(faGoogle)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)

// **inicializa o tema salvo antes de montar**
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore(pinia)
// re-aplica o tema que está em localStorage (ou system)
themeStore.setTheme(themeStore.theme)

// Reaplicar token + header e buscar usuário antes de montar o app
const auth = useAuthStore(pinia)
if (auth.token) {
    await auth.fetchUser()
}

app.mount('#app')
