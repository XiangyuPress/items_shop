<template>

  <xiangyu_head></xiangyu_head>

  <judge_node :code="node_code"></judge_node>

</template>

<script setup>

import xiangyu_head from '../../components/header/index.vue'
import judge_node from "../../components/judge_node/index.vue";
import {onMounted,ref} from "vue";
import axios from "axios";

let node_code=ref()

onMounted(()=>{
  axios.get('/judge_node').then(res=>{
    node_code.value=res.data.code
  })
})

</script>

<style scoped>

</style>
