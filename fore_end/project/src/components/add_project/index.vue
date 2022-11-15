<template>
<div class="fixed right-24 top-3/4 shadow-lg   w-12 h-12 text-center text-xl cursor-pointer
            transition hover:-translate-y-2	 bg-primary text-white border
            p-2 rounded-full" @click="demo=!demo">+
</div>



  <transition-group  :duration="550"  name="v">
    <div v-if="demo"
         @click="add_project.vue.show=!add_project.vue.show"
         style="top: 60%;right:12% "
         class=" fixed flex items-center justify-center
         hover:-translate-y-2 transition cursor-pointer border
          rounded-full text-center w-12 h-12 bg-primary">
      <img src="../../../public/state_img/vue.png" class="w-6 " alt="">
    </div>
    <div v-if="demo"
         style="top: 68%;right:15% "
         @click="add_project.git.show=!add_project.git.show"
         class=" fixed rounded-full flex items-center justify-center
          hover:-translate-y-2 transition cursor-pointer border
          text-center /3 w-12 h-12 bg-primary">
      <img src="../../../public/state_img/github_project.png" alt="">
    </div>
    <div v-if="demo"
         style="top: 78%;right:15% "
         class=" fixed  rounded-full flex items-center
         hover:-translate-y-2 transition cursor-pointer border
         justify-center text-center w-12 h-12 bg-primary">
      <img src="../../../public/state_img/收藏.png" class="w-6" alt="">
    </div>

    <div v-if="demo"
         style="top: 88%;right:12% "
         class=" fixed  rounded-full text-xl hover:text-white
          cursor-pointer text-center border
          hover:-translate-y-2 transition
            flex items-center justify-center w-12 h-12 bg-primary">?</div>


    <div v-if="demo"
         style="top: 55%;right:8% "
         @click="add_project.mkdir.show=!add_project.mkdir.show"
         class=" fixed  rounded-full text-xl hover:text-white
          cursor-pointer text-center border
          hover:-translate-y-2 transition
            flex items-center justify-center w-12 h-12 bg-primary">
      <img src="../../../public/state_img/文件夹_add.png" alt="">
    </div>

    <div v-if="demo"
         style="top:90%;right:5% "
         class=" fixed  rounded-full text-xl hover:text-white
          cursor-pointer text-center border
          hover:-translate-y-2 transition
            flex items-center justify-center w-12 h-12 bg-primary"
        @click="add_i18n"
    >
      <img src="../../../public/state_img/数译_文本翻译.png" alt="">
    </div>

  </transition-group>


  <transition-group name="v">
    <add_project_vue v-if="add_project.vue.show" @hide_window="hide_window"></add_project_vue>
    <create_mkdir  v-if="add_project.mkdir.show" ></create_mkdir>
    <git_dowload v-if="add_project.git.show"></git_dowload>

  </transition-group>


</template>

<script setup>

import {reactive, ref} from "vue";
import add_project_vue from "../add_project_vue/index.vue";
import git_dowload from "../git_dowload/index.vue";
import axios from "axios";
import {refresh} from "../../npm_tool_pack/index.js";
let demo=ref(true)


let add_project=reactive({
    vue:{
      show:false
    },
  mkdir:{
      show:false
  },
  git:{
      show:false
  }
})

function hide_window(e){
  add_project.vue.show=e
}

function add_i18n(){
  axios.get('/create_i18n').then(res=>{
  alert('创建成功')
    refresh()
  })
}



</script>



<style>
.v-enter-active,
.v-leave-active {  /*  这里的v-enter-active和v-leave-active是transition-group的name属性值 */
  transition: all 0.5s ease;
}

.v-enter-from{
  transform: translateX(120px);
}

.v-leave-to{
  transform: translateX(70px);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
