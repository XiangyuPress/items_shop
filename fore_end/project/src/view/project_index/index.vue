<template>

<!--  路径-->
  <div class="w-full p-1 bg-primary border-b mb-2 rounded-b rounded-t text-white flex " style="justify-content: space-between">
    <div>{{path}}</div>

    <div class="mr-2 transition cursor-pointer	active:scale-50	" >
      <img src="../../../public/state_img/xiangyu_backup.png" @click="cd_next" alt="">
    </div>
  </div>

<!--文件显示内容-->
  <div class="mkdir_content">
    <div v-for="(item,index) in file" >
      <mkdir_components :mkdir_name="item.name" :size="item.size" :type="item.type" @dblclick="db_cd_next(item.name)"></mkdir_components>
    </div>
  </div>


<!--  创建项目使用的图标 -->
  <add_project
      class=" "></add_project>
</template>

<script setup>
import mkdir_components from "../../components/mkdir_components/index.vue";
import add_project from "../../components/add_project/index.vue";
import {onMounted, reactive, ref} from "vue";
import axios from "axios";

let file=reactive([])
let path=ref('')

function db_cd_next(val){
  axios.post('jump',{
    path:path.value+'\\'+val
  }).then(res=>{
    file.length=0
    file.push(...res.data.file)
    path.value=res.data.path
  })
}

//跳转上一层
function cd_next(){
  axios.get('/back').then(res=>{
    file.length=0
    file.push(...res.data.file)
    path.value=res.data.path
  })
}


onMounted(()=>{
  axios.get('/ls').then(res=>{
    console.log(res.data)
    file.push(...res.data.file)
  })

  axios.get('/search_current').then(res=>{
    path.value=res.data.path
  })
})
</script>

<style scoped>

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {  /*滚动条里面小方块*/
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.mkdir_content{
  height: 560px;
  border-radius: 10px;
  /*  阴影*/
  /*box-shadow: 0 0 10px rgba(0,0,0,0.2);*/
  overflow: hidden;
  /*  可以滑动*/
  overflow-y: scroll;
}
</style>
