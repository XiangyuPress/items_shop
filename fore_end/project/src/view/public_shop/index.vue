<template>

  <div class=" w-full h-full bg-primary">

    <div class="flex w-full  h-12 ml-3  ">
      <img src="../../../public/state_img/npm.png" class="mt-4 w-6 h-6" alt="">
      <npm_search @search_content="search_content" ></npm_search>
    </div>





    <div v-if="search_length.length!=0" class="w-full  pt-9 pl-3  npm_content">
      <div class="border-b text-white font-bold " v-for="(item,index) in search_length"  >
        <div class="ml-3 flex 	" style="justify-content:space-between;align-items: center">

          <div class="cursor-pointer hover:underline ">{{ item.package.name }} <span>@{{item.package.version}}</span></div>

          <div style="" class="flex">
            <div class="npm_install bg-primary-content/30 w-24 bg-white mr-2" @click="add_pack(item)">install</div>
            <div class="npm_install bg-primary-content/30 w-44 bg-white mr-2" @click="global_add_pack(item)">Global Download</div>
          </div>

        </div>
        <div class="w-2/3 m-3">{{ item.package.description }}</div>

        <div class="flex m-2 " style="width: 70%;flex-wrap: wrap" v-if="item.package.keywords">
          <div class="ml-3 mt-2 p-2 rounded-box bg-primary-content/30" v-for="(item,index) in item.package.keywords">{{ item }}</div>
        </div>

        <div class="mb-3 flex  ml-5 " style="font-weight: 500">
          <div v-if="item.package.author">{{ item.package.author.name }}</div>
          <div class="flex ml-3">
            <div>last time:</div>
            <div>{{item.package.date}}</div>
          </div>
        </div>



      </div>
    </div>
    <div v-else-if="search_length.length==0" class="">
      <not_found></not_found>
    </div>

  </div>




</template>

<script setup >

import npm_search from "../../components/npm_search/index.vue";
import not_found from "../../components/404_not_found/index.vue";
import {reactive} from "vue";
import axios from "axios";
import {refresh} from "../../npm_tool_pack/index.js";

let search_length=reactive([])
let search_content= (content) => {
  search_length.length=0
  console.log(content)
  search_length.push(...content)
};


function add_pack(item){
  axios.post('/download_package',{name:item.package.name}).then(res=>{
    alert(res.data.msg)
    refresh()

  })
}

function global_add_pack(){
  axios.post('/download_package_global',{name:item.package.name}).then(res=>{
    alert(res.data.msg)
    refresh()

  })


}

</script>

<style scoped>

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {  /*????????????????????????*/
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.npm_content{
  height: 540px;
  border-radius: 10px;
  /*  ??????*/
  /*box-shadow: 0 0 10px rgba(0,0,0,0.2);*/
  overflow: hidden;
  /*  ????????????*/
  overflow-y: scroll;
}

.npm_install{
  border-radius: 9px;
/*  ????????????*/
/*  color: #2c2c2c;*/
  /*  ????????????*/
  /*background-color: #ffffff;*/
  /*  ????????????*/
  text-align: center;
  /*  ????????????*/
  cursor: pointer;
  /*  ????????????*/
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
}

.npm_install:hover{
  /*  ????????????*/
  transform: scale(1.1);
/*  ???????????????*/
  text-decoration: underline;
/*  ???????????????*/
  user-select: none;
}

/*??????active*/
.npm_install:active {
  /*  ????????????*/
  transform: scale(1.0);
  /*  ???????????????*/
  text-decoration: none;
}
</style>
