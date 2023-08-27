import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 1. 引入你需要的组件
import { Button, Field } from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";
// import 'vant/es/button/style/index';

const app = createApp(App)

app.use(createPinia())
app.use(Button).use(Field);
app.use(router)

app.mount('#app')
