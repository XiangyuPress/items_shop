import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import zh from './lang/zh/index.js'  // 中文语言包
import en from './lang/en/index.js'  // 英文语言包

// 实例化I18n
const i18n = createI18n({
    locale: "zh", // 初始化配置语言
    legacy: false,  // 使用vue-i18n的新版本
    messages: {
        zh,
        en
    }
})

export default i18n
