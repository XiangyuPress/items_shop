import {createRouter,createWebHashHistory} from "vue-router";
import axios from "axios";

let routes=[
    {
        path:"/",
        name:"默认页面",
        component:import('../view/index/index.vue')
    },
    {
        path:"/project",
        name:"项目",
        component: import('../view/project/index.vue'),
        children:[
            {
                path:"/project/index",
                component: import('../view/project_index/index.vue')
            },
            {
                path:"/project/shopping",
                component: import('../view/public_shop/index.vue')
            },
        ]
    }
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})


//路由守卫
router.beforeEach((to,from,next)=>{
//  在进入project进行守卫判断
  if(to.path=='/project'){
      axios.get('/judge_node').then(res=>{
          if(res.data.code==1){
              next()
          }else {
              //返回到默认路径
              router.push('/')
          }
      })
  }else {
      return next()
  }

})

export default router
