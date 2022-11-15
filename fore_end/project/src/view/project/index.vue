<template>
<xiangyu_header></xiangyu_header>

  <div class=" mx-auto flex shadow-xl  mt-5 max-h-screen " style="width: 90%">

<!--    侧边栏-->
    <div class="w-32  bg-primary  flex flex-col" style="height:600px">
          <div class="flex items-center pb-2 pt-2 cursor-pointer active:bg-white transition justify-center border" @click="router.push('/project/index')">
            <img src="../../../public/state_img/文件夹.png" alt="">
            <div class="font-mono font-bold text-center text-white ml-3" style="font-size: 12px">文件管理</div>
          </div>

          <div class="flex items-center pb-2 pt-2 cursor-pointer active:bg-white transition justify-center border" @click="router.push('/project/shopping')">
            <img src="../../../public/state_img/npm.png" alt="">
            <div class="font-mono font-bold text-center text-white ml-3" style="font-size: 12px">资源商店</div>
          </div>

    </div>


<!--    显示页面-->
    <div class="w-full border" style="height: 600px;">

      <div  class="text-gray-300 font-mono font-bold   w-full h-full " style="font-size: 16px">
<!--        请选择文件夹,开始项目吧,Up!-->

        <router-view></router-view>

      </div>


    </div>

  </div>




</template>

<script setup>
import xiangyu_header from '../../components/header/index.vue'
import router from "../../router/index.js";
</script>

<style scoped>



</style>
