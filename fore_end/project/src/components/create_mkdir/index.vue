<template>

  <div class="custom-card bg-primary">
    <n-input
        v-model:value="input_value.value_1"
        placeholder="请输入名称" style="width: 40%;" class="relative left-52 top-32"></n-input>

    <n-button @click="create_mkdir" type="info" class="absolute bottom-8 right-12">提交</n-button>
  </div>

</template>

<script setup>

import {reactive} from "vue";
import {mkdir,refresh} from "../../npm_tool_pack/index.js";

let input_value=reactive({
  value_1:""
})

function create_mkdir(){
  console.log(input_value.value_1)
  mkdir(input_value.value_1)
  refresh()
  alert("创建成功")
}


</script>

<style scoped>
.custom-card{
  width: 50%;
  height: 50%;
  position: absolute;
  top: 30%;
  left: 20%;
  border-radius: 7px;
  box-shadow: 0 0 13px #8a8a8a;
}
</style>
