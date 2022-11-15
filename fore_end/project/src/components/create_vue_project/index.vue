<template>
  <input type="text"
         style="border: 0px;outline: none;color:#000;font-size: 12px"
         class="w-32 h-8 mx-auto rounded transition focus:-translate-y-5 focus:shadow-lg	p-3	 pl-2"
          placeholder="请输入项目名字"
         v-model="pack.project_name.name"
  >
    <div  class="text-center mt-3">当前技术选型是:{{pack.create_project_type.pack_name}}</div>


    <div>
      <div style="width: 30%;height: 400px;overflow-y: scroll" class="pl-3 ">
        <div>{{ $t('message.project_index.pack_list') }}:</div>
        <n-tree
            block-line
            :data="pack.npm_pack.pack"
            label-field="name"
            key-field="index"
            selectable
        />
      </div>
    </div>

</template>

<script setup>
import {onMounted, watchEffect} from "vue";
let emit=defineEmits(['input_watch']);
let props=defineProps({
  pack:{
    type:Array,
    default:[]
  }
})

onMounted(()=>{
  //将props.pack里面的create_project_type里面只要有一个为true的就可以,获取到这个对象的名字
  let create_project_type=props.pack.create_project_type
  for(let key in create_project_type){
    if(create_project_type[key]){
      props.pack.create_project_type.pack_name=key
    }
  }
})


//监听输入框的值
watchEffect(()=>{
  emit('input_watch',props.pack.project_name.name)
})


</script>

<style scoped>

</style>
