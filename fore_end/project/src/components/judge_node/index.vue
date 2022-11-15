<template>

  <div class="w-2/3 mx-auto  mt-3" v-if="code==0">
    <img src="../../../public/state_img/404.png" class="w-2/5 mx-auto" alt="">
    <div class="text-center font-mono	" >{{ $t('message.not_node.not_1') }}<span class="text-blue-300 cursor-pointer hover:underline ">node</span></div>
    <div class="text-center font-mono">{{ $t('message.not_node.not_2') }}</div>
    <div class="text-center font-mono">{{ $t('message.not_node.not_3') }}</div>
    <div class="w-24
     mx-auto
     text-center
     transition
      cursor-pointer p-2 bg-blue-500  rounded text-white active:scale-50 	" @click="refresh" style="">{{ $t('message.not_node.refresh') }}</div>

  </div>

  <div class="w-2/3 mx-auto  mt-3" v-else-if="code==1">
    <img src="../../../public/state_img/注册完成.png" class="w-2/4 mx-auto" alt="">
    <div class="text-center font-serif			" >{{ $t('message.success_node.success_1') }}<span class="text-blue-300 cursor-pointer hover:underline ">node</span></div>
    <div class="text-center font-mono">{{ $t('message.success_node.success_2') }}</div>
    <div class="text-center font-mono">{{ $t('message.success_node.success_3') }}</div>

    <div class="flex mt-5">

          <div class="w-24
             mx-auto
             text-center
             transition
              cursor-pointer p-2 bg-blue-500  rounded text-white active:scale-50
            " @click="refresh" style="">{{ $t('message.not_node.refresh') }}</div>



          <div class="w-44
            max-w-64
            inline-block
             mx-auto
             text-center
             transition  font-mono
             cursor-pointer p-2 bg-blue-500
             rounded text-white active:scale-50
             flex items-center
        " @click="jump" style="background: #161B22">
            <img src="../../../public/state_img/GitHub.png" class="w-8 h-8" alt="">
            <div class="ml-2">XiangyuPress</div>

          </div>


          <div class="
                inline-block
                 mx-auto
                 text-center
                 transition  font-mono
                 cursor-pointer p-2 bg-blue-500
                 rounded text-white active:scale-50
                 flex items-center
            " @click="join" style="background: #699cea;max-width: 300px">
            <div class="ml-2 ">{{ $t('message.success_node.success_4') }}</div>

          </div>

    </div>



  </div>

</template>

<script setup>

import router from "../../router/index.js";

let props = defineProps({

  //拿到父组件传来的code
  code: {
    type: Number,
    default: 3
  }

})

//刷新函数
function refresh(){
  window.location.reload()
}

//页面跳转
function jump() {
  window.location.href = "https://github.com/XiangyuPress"
}

function join(){
  router.push('/project')
}

</script>

<style scoped>

</style>
