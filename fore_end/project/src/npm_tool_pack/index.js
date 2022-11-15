import axios from "axios";

  function search(val){
    axios.defaults.baseURL = 'https://api.npms.io/v2'   //设置的临时默认地址
    //进行网络请求 并把内容返回
      return axios.get(`/search?q=${val}&from=0&size=15`).then(res=>{
         axios.defaults.baseURL='http://localhost:2022'
         return res.data
     })
}

//使用npm的搜索 异步函数并返回
async function npm_search(name){
    let res=await search(name)  //等待异步函数执行完毕  返回值 此时res为一个promise对象 我们return的内容在res.data中
    return res
}

//创建项目
 function create_project(project){
      axios.post('/create_file',{content:project}).then(res=>{
      })
}


//cd 当前目录下的文件夹
    function cd(path){
        axios.post('/cd',{path}).then(res=>   {
        })
    }

    //更新npm i
    function update_npm(name){
        axios.post('/update_npm',{name}).then(res=>{
        })

    }


    //调用npm install 下载包
    function download_npm(content,name){
        axios.post('/download_npm',{content,name}).then(res=>{
        })
    }



    //创建文件夹
    function mkdir(name){
        axios.post('/create_dir',{name}).then(res=>{
        })
    }


    //创建i18n配置文件
    function create_i18n_custorm(){
      axios.get('/create_i18n').then(res=>{
      })
    }

    //自定义下载git仓库
    function custorm_git_download(git_path){
        axios.post('/custorm_git_download',{git_path}).then(res=>{
        })
    }

    //刷新函数
    function refresh(){
      window.location.reload()
    }


    //编辑json文件
    function update_json(content){
        axios.post('/update_json',{content}).then(res=>{
        })
    }

//导出
export {npm_search,
        create_project
        ,cd,update_npm
        ,download_npm
        ,mkdir
        ,create_i18n_custorm,custorm_git_download
        ,refresh,update_json}
