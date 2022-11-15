<template>
<div class="w-full cursor-pointer flex items-center	border-b active:bg-white transition h-8 bg-primary">
  <img src="../../../public/state_img/文件夹_index.png" class="mr-3 ml-3" alt="" v-if="type=='dir'">
  <img src="../../../public/state_img/文本.png" class="mr-3 ml-3" alt="" v-else-if="type=='file'">
  <div class="text-xs text-white"  @dblclick.self="db_slef_text($event)">{{mkdir_name}}</div>

  <div  style="font-size: 12px" class="ml-3 w-full text-right mr-5 flex justify-end text-white">
    <div class="w-12  text-center">{{$t('message.project_index.size')}}:</div>
    <div class="text-ellipsis w-12 text-left"> {{size}}</div>
  </div>
</div>
</template>

<script setup>

let props=defineProps({
  mkdir_name:{
    type:String,
    default:"当前是默认文件夹名字"
  },
  size:{
    type:Number,
    default:0
  },
  type:{
    type:String,
    default:"file"
  }
})

function db_slef_text(e){
 //将e变成input可修改状态
   e.target.innerHTML=`<input type="text"value="${e.target.innerHTML}" style="color:black;">`
  //获取Dom节点
  let add_input=e.target.children[0]
//  添加脱焦
  add_input.addEventListener('blur',(e)=>{
    //将input变成文本
    e.target.parentNode.innerHTML=add_input.value
    //删除input标签
    e.target.remove()
  })
}


</script>

<style scoped>
/*文本过长省略*/
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
