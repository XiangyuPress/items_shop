<template>

  <div class="">
    <input type="text" placeholder="请输入想配置的包..."
           class="border w-42 input input-ghost shadow-xl border border-white  text-xs mt-3 rounded h-8 ml-3 "
           v-model="input"
           @blur="search_blur"
           @keydown.enter="search"
    >
    <button class="bg-primary-content/40 p-2 rounded-box w-24 ml-2 text-white transition search_button" @click="search">
      {{ $t('message.npm_search.search') }}</button>

    <transition name="v">
      <div class="search_concent_w mt-3 transition h-48 bg-white ml-3 absolute top-31  " v-show="Search_content.length!=0">
        <div class="" v-for="(item,index) in Search_content">
          <div class="pl-3 pb-2 text-black border w-full flex justify-between active:bg-gray-300	">
            <div>{{ item.package.name }}</div>
            <div class="flex" style="width: 140px">
              <div style="width: 70px">verison:</div>
              <div>{{item.package.version}}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>


  </div>


</template>

<script setup>
import { refThrottled } from '@vueuse/core'
import {reactive, ref, watch,defineEmits} from "vue";  // 从vue中引入ref watch getCurrentInstance  getCurrentInstance是用来获取当前组件实例的
import axios from "axios";
import {npm_search,} from "../../npm_tool_pack/index.js";

const input = ref('')
const throttled = refThrottled(input, 500, false)  // 1s
let Search_content=reactive([])
let emits=defineEmits(['search_content'])


//当throttled变化时,watch

watch(throttled,(val)=>{
  Search_content.length=0
  //设置临时axios 的默认地址
  axios.defaults.baseURL = 'https://api.npms.io/v2'   //设置的临时默认地址
  axios.get(`/search?q=${val}&from=0&size=15`).then(res=>{
    Search_content.push(...res.data.results)
    axios.defaults.baseURL='http://localhost:2022'

  })
})


function search_blur(){
  setTimeout(()=>{
    Search_content.length=0
  },100)
}


//搜索函数 等待拿到的数据
async function search(){
  let res=await npm_search(input.value)
  emits('search_content',res.results)
}

</script>

<style scoped>

/*设置滚轮样式*/
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {  /*滚动条里面小方块*/
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;

}

.search_concent_w{
  width: 570px;
  border-radius: 10px;
/*  阴影*/
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  overflow: hidden;
/*  可以滑动*/
  overflow-y: scroll;
/*文本过长省略*/

}

.search_button:active{
  transform: scale(0.9);
}

/*search_concent的搜索*/
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

::placeholder {
  color: #fff;
  opacity: 1;
}


</style>
