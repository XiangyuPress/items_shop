<template>
  <div class="custorm_card bg-primary transition">
    <div class="flex items-center mt-2 ml-3">
      <img src="../../../public/state_img/github_project.png" class="" alt="">
      <div class="ml-3">GitHub</div>
    </div>

    <div class="p-2 border-b transition active:bg-white flex justify-between" @click.self="download_git(item.git)" v-for="(item,index) in arr">
      <div class="" style="cursor:pointer;">{{item.name}}</div>
      <div @click="delete_git(index)">
        <img src="../../../public/state_img/删除.png" alt="">
      </div>
    </div>

    <div class="w-12 rounded-full h-12 bg-primary-content/50 text-center flex items-center
                justify-center absolute transition hover:-translate-y-5	 bottom-3 right-8"
              style="cursor:pointer;" @click="input_show=!input_show">添加</div>


  <transition-group name="v">
    <div class="custorm_card p-4 bg-primary-content/50"
         style="width: 70%;height: 40%;position: relative;left: 15%;top: 20%"
         v-if="input_show">


      <n-input placeholder="请输入预设名字" v-model:value="obj_input.name"></n-input>
      <n-input placeholder="请输入git地址" class="mt-3" v-model:value="obj_input.git"></n-input>

      <n-button type="success" class="absolute bottom-3 right-3" @click="add_git()" >提交</n-button>
    </div>
  </transition-group>

  </div>





</template>

<script setup>

import {git_download} from "../../../dowload_pack.json"
import {update_json,custorm_git_download} from '../../npm_tool_pack/index.js'
import {onMounted, reactive, ref} from "vue";
let input_show=ref(false)

let arr=reactive([])

let obj_input=reactive({
  name:"",
  git:""
})

onMounted(()=>{
  arr.push(...git_download)
})

function download_git(val){
  custorm_git_download(val)
}

function delete_git(index){
  arr.splice(index,1)
  update_json(arr)
}


function add_git(){
  arr.push({
    name:obj_input.name,
    git:obj_input.git
  })
update_json(arr)
input_show.value=!input_show.value
}


</script>

<style scoped>

.custorm_card{
  width: 30%;
  height: 60%;
  position: absolute;
  top: 20%;
  left: 40%;
  border-radius: 7px;
  color: white;
  box-shadow: 0 0 13px #d5d5d5;
}

</style>
