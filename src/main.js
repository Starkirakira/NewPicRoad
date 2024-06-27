import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createMetaManager } from 'vue-meta'

import { VueMasonryPlugin } from 'vue-masonry'
import VueMasonry from 'vue-masonry-css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const metaManager = createMetaManager()

app.use(createPinia())
app.use(router)

app.use(metaManager)
app.use(VueMasonryPlugin)
app.use(VueMasonry)

app.mount('#app')
