<template>
<div class="w-full h-16 bg-primary flex items-center  " style="justify-content: space-around">

  <img src="../../assets/logo.png" class="w-12 h-12 cursor-pointer hover:scale-75	 transition	active:bing-3 active:border-2 rounded-full ml-3 " alt="">

  <div class="flex">

        <div class="flex">
          <div class="font-mono font-bold text-white mr-3">{{ $t('message.theme') }}</div>
          <input class="toggle" type="checkbox" checked data-toggle-theme="emerald,mytheme" />
        </div>

      <div class="flex ml-6">
        <label class="swap" >
          <input type="checkbox" />
          <svg t="1667049416940"  @click="lang_switch()" class="icon swap-on" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4652" width="18" height="18"><path d="M229.248 704V337.504h271.744v61.984h-197.76v81.28h184v61.76h-184v99.712h204.768V704h-278.72z m550.496 0h-70.24v-135.488c0-28.672-1.504-47.232-4.48-55.648a39.04 39.04 0 0 0-14.656-19.616 41.792 41.792 0 0 0-24.384-7.008c-12.16 0-23.04 3.328-32.736 10.016-9.664 6.656-16.32 15.488-19.872 26.496-3.584 11.008-5.376 31.36-5.376 60.992V704h-70.24v-265.504h65.248v39.008c23.168-30.016 52.32-44.992 87.488-44.992 15.52 0 29.664 2.784 42.496 8.352 12.832 5.6 22.56 12.704 29.12 21.376 6.592 8.672 11.2 18.496 13.76 29.504 2.56 11.008 3.872 26.752 3.872 47.264V704z" p-id="4653" fill="#ffffff"></path><path d="M160 144a32 32 0 0 0-32 32V864a32 32 0 0 0 32 32h688a32 32 0 0 0 32-32V176a32 32 0 0 0-32-32H160z m0-64h688a96 96 0 0 1 96 96V864a96 96 0 0 1-96 96H160a96 96 0 0 1-96-96V176a96 96 0 0 1 96-96z" p-id="4654" fill="#ffffff"></path></svg>
          <svg t="1667049256948"  @click="lang_switch()" class="icon swap-off" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3570" width="18" height="18"><path d="M160 144a32 32 0 0 0-32 32V864a32 32 0 0 0 32 32h688a32 32 0 0 0 32-32V176a32 32 0 0 0-32-32H160z m0-64h688a96 96 0 0 1 96 96V864a96 96 0 0 1-96 96H160a96 96 0 0 1-96-96V176a96 96 0 0 1 96-96z" p-id="3571" fill="#ffffff"></path><path d="M482.176 262.272h59.616v94.4h196v239.072h-196v184.416h-59.616v-184.416H286.72v-239.04h195.456V262.24z m-137.504 277.152h137.504v-126.4H344.64v126.4z m197.12 0h138.048v-126.4H541.76v126.4z" p-id="3572" fill="#ffffff"></path></svg>
        </label>
      </div>

  </div>
</div>
</template>


<script setup>
import { useI18n } from 'vue-i18n'
import { themeChange } from 'theme-change'
import {onMounted} from "vue";


onMounted(() => {
  themeChange(false)
})

//修改语言
const { locale, t } = useI18n()
const lang_switch = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}


</script>

<style scoped>

</style>
