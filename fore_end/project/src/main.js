import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
//引入i18n
import i18n from "./i18n/index.js";
import axios from "axios";

//设置默认请求地址
axios.defaults.baseURL='http://localhost:2022'
const app = createApp(App)
app.config.globalProperties.$http = axios
app.mount('#app')
createApp(App).use(i18n).use(router).mount('#app')
