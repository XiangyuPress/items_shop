<template>
  <div class="w-full border-b  p-2 " v-for="(item,index) in pack_list">
    <div class="flex" style="justify-content: space-between">
      <div class="flex">
        <div>{{item.package.name}}</div>
        <div class="pl-6">@{{item.package.version}}</div>
      </div>
      <div class="mr-3 hover:underline" @click="add_pack(item)" >添加</div>
    </div>
  </div>
</template>

<script setup>
const emits=defineEmits('add_pack_list')
let props = defineProps({
 pack_list:{
   type:Array,
   default:[]
 }
})

function add_pack(item){
  emits('add_pack_list',item.package)
}

</script>

<style >

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {  /*滚动条里面小方块*/
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
