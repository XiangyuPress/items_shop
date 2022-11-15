<template>
<div class=" rounded-box shadow-xl p-12 bg-primary/90 fixed top-32 pt-2 left-52 z-10 cursor-pointer"
      style="height: 600px;width: 80%"
>
  <div class="text-right mb-2  pr-2 hover:text-white transition" @click="hide_window">x</div>


  <n-steps :current="(current)" :status="currentStatus" >
    <n-step
        title="选择项目类型vite,vue-cli"
        description="请选择创建项目类型vite或者vue-cli"
    />
    <n-step
        title="请选择配置包，或者默认配置"
        description="我们选择配置的包，来为我们项目进行功能装饰"
    />
    <n-step
        title="项目创建成功"
        description="接下来我们给项目起个好听的名字，例如Vue"
    />
  </n-steps>


  <transition-group :duration="550" name="past">
    <div class="w-full h-8 border-b active:bg-white pl-2 text-white" v-if="current==1" v-for="(item,index) in default_list">
      <div @click="select_project_type(item.name)">{{item.name}}</div>
    </div>
    <div class="w-full h-full flex  pl-2 text-white" v-if="current==2" style="height: 460px;">

            <div style="width: 70%;overflow: hidden;overflow-y: scroll">
              <npm_search @search_content="search_content"></npm_search>
              <pack_add :pack_list="pack_list" @add_pack_list="add_pack_list"></pack_add>
            </div>

            <div style="width: 30%;height: 100%;overflow: scroll" class="pl-3">
                    <div>{{ $t('message.project_index.pack_list') }}:</div>
              <n-tree
                  block-line
                  :data="pack_data"
                  label-field="name"
                  key-field="index"
                  selectable
                  cascade

              />



            </div>

    </div>
    <div class="w-full h-full flex flex-col text-white" v-if="current==3"  style="height: 460px;" >
      <create_vue_project :pack="steps_pack"  @input_watch="input_watch"></create_vue_project>
    </div>

  </transition-group>



    <button
        class="p-2 transition-all  absolute right-12 bottom-12
               hover:rounded-md border   text-white"  @click="steps_next">下一步</button>
</div>


</template>

<script setup>
import {vue_pack} from '../../../dowload_pack.json'
import {effect, onMounted, reactive, ref} from "vue";
import {create_project, cd, update_npm, download_npm, refresh} from "../../npm_tool_pack/index.js";
let emit=defineEmits(['hide_window']);
let currentStatus=ref("process");
let current=ref(1);
let pack_list=reactive([])
//创建步骤的列表
let steps_pack=reactive({
  create_project_type:{
    vue_cli:false,
    vite:false
  },
  npm_pack:{
    pack:[]
  },
  project_name:{
    name:""
  }
})


//创建data 添加默认数据
let pack_data=reactive([])




//隐藏窗口
function hide_window() {
  emit('hide_window',false)
}

//渲染列表  这是一个数组
let default_list=reactive([])

onMounted(()=>{
  default_list.length=0
  default_list.push(...vue_pack)
})

//下一步
async function steps_next(){
  current.value++
  if(current.value>3){
    alert("创建成功")
    await create_project(steps_pack)
    await cd(steps_pack.project_name.name)
    await update_npm(steps_pack.project_name.name)
    await download_npm(steps_pack.npm_pack.pack,steps_pack.project_name.name)
    current.value=1
  }
}


//选择项目类型
function select_project_type(type){
  steps_pack.create_project_type.vue_cli=false
  steps_pack.create_project_type.vite=false
  steps_pack.create_project_type[type]=true
}

//回调函数 搜索返回的函数
function search_content(content){
  pack_list.length=0
  pack_list.push(...content)
}


//回调函数 点击添加的回调函数 接下来就是存放在已有的包中列表
function add_pack_list(item){
  steps_pack.npm_pack.pack.push(item)
  pack_data.push({
    ...item,
    index:pack_data.length,
    checked:true
  })
  console.log(pack_data)
}


function input_watch(item){
  steps_pack.project_name.name=item
}

function del_arr(){
  //根本checkbox的值来删除
  pack_data.forEach((item,index)=>{
    console.log(item)
  })
}


function onUpdateIndeterminateKeys(keys) {
  console.log(keys)
}

</script>

<style >
.n-steps .n-step-content .n-step-content-header .n-step-content-header__title{
  color: white;
}

.n-steps .n-step-content .n-step-content__description{
  color: white;

}

.past-enter-active,
.past-leave-active {  /*  这里的v-enter-active和v-leave-active是transition-group的name属性值 */
  transition: all .3s ease;
}

.past-leave-to{
  transform: translateY(190px);
}

.past-enter-from,
.past-leave-to {  /*  这里的v-enter-from和v-leave-to是transition-group的name属性值 */
  opacity: 0;  /*  透明度为0 */
  transform: translateY(100px);

}
.n-tree .n-tree-node-content .n-tree-node-content__text{
  color: white;
}
.n-base-icon{
  color: white;
}
.n-empty .n-empty__icon + .n-empty__description{
  color: white;
}

.n-tree .n-tree__empty{
  margin-top: 30px;
}

</style>
