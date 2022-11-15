
const express=require('express');
//解决跨域
const bodyParser = require('body-parser');  //解析post请求的参数  可以获取到参数  但是不能获取到文件
const cors=require('cors');
const app=express();
const shell = require('shelljs')
const multipart = require('connect-multiparty');
const axios = require("axios");
const multipartyMiddleware = multipart();
let add_vue_cli='https://github.com/Fnlock1/vue_cli_default.git'
const delMkdir = require('./pack/del_mkdir');
const creati18n_git = require('./pack/create_i18n');
const {custorm_git_download} = require("./pack/download_git_custorm");
const {updateJsonFile} = require("./pack/update_json");
app.use(cors());
app.use(bodyParser.json());  //解析json格式的参数
app.use(bodyParser.urlencoded({ extended: true }));  //拿到客户端发送的消息

//判断是否安装node

app.get('/judge_node',(req,res)=>{
    if(shell.which('node')){
        res.send(
            {
                code:1,
                msg:'node已安装'
            }
        )
    }else{
        res.send({
            code:0,
            msg:'node未安装'
        })
    }

})

app.get('/ls',(req,res)=>{
    let files=shell.ls('-l');
    //判断是否是文件夹 如果是文件夹就加type:dir  不是就加type:file
    files.forEach(item=>{
        if(item.isDirectory()){
            item.type='dir'
        }else{
            item.type='file'
        }
    })
    res.send({
        file:files
    })
})


//获取当前路径
app.get('/search_current', (req,res)=>{
   //使用shell 查看当前所在的路径 window
   res.send({
       code:1,
       path:shell.pwd()
   })
})

//判断电脑装没装webstorm

app.get('/judge_webstorm',(req,res)=>{
    if(shell.which('webstorm')){
        res.send({
            code:1,
            msg:'webstorm已安装'
        })
    }else{
        res.send({
            code:0,
            msg:'webstorm未安装'
        })
    }
})


//启动webstorm
app.get('/start_webstorm',(req,res)=>{
    shell.exec('webstorm')
    res.send({
        code:1,
        msg:'webstorm已启动'
    })
})


//下载包
app.post('/download_package',multipartyMiddleware,(req,res)=>{
    let {name}=req.body;
    // //使用shelljs下载包
    shell.exec(`npm i ${name} -S`)
    res.send({
        code:1,
        msg:'下载成功'
    })
})

//全局下载包
app.post('/download_package_global',multipartyMiddleware,(req,res)=>{
    let {name}=req.body;
    // //使用shelljs下载包
    shell.exec(`npm i ${name} -g`)
    res.send({
        code:1,
        msg:'下载成功'
    })
})




//cd.. 返回上一级
app.get('/back',(req,res)=>{
    shell.cd('../')

    let files=shell.ls('-l');
    //判断是否是文件夹 如果是文件夹就加type:dir  不是就加type:file
    files.forEach(item=>{
        if(item.isDirectory()){
            item.type='dir'
        }else{
            item.type='file'
        }
    })

    res.send({
        code:1,
        msg:'跳转成功',
        path:shell.pwd(),
        file:files
    })
})

//跳转到指定目录
app.post('/jump',multipartyMiddleware,(req,res)=>{
    let {path}=req.body;
    shell.cd(path)
    let files=shell.ls('-l');
    //判断是否是文件夹 如果是文件夹就加type:dir  不是就加type:file
    files.forEach(item=>{
        if(item.isDirectory()){
            item.type='dir'
        }else{
            item.type='file'
        }
    })
    console.log(path)
    res.send({
        code:1,
        msg:'跳转成功',
        path:shell.pwd(),
        file:files
    })
})



//根据传的内容创建文件  以对象的形式传过来
app.post('/create_file',multipartyMiddleware,(req,res)=>{
    let {content}=req.body;
//    他会拿到这样的数据格式
//    let demo= {
//         create_project_type:{  //创建项目的类型
//                  pack_name: "vite",
//                 vite:true,
//                 vue_cli:false,
//         },
//        npm_pack:[
//            {
//                scope: "vueuse",  //作用域  有的包有作用域  有的没有
//                name: "@vueuse/metadata",  //包名
//                version: "8.7.4"
//            },
//            {
//                scope: "vueuse",  //作用域  有的包有作用域  有的没有
//                name: "@vueuse/metadata",  //包名
//                version: "8.7.4"
//            }
//        ],
//         project_name:'test',  //项目名
//     }

//    判断是vue_cli还是vite
    if(content.create_project_type.vite){
        //创建vite项目
        let add=`npm create vite@latest ${content.project_name.name} -- --template vue`
        shell.exec(add)
        res.send({
            code:1,
            msg:'创建成功'
        })
    }else if(content.create_project_type.vue_cli){
        //判断电脑安装没git
        if(shell.which('git')){  //安装了git
            shell.exec(`git clone ${add_vue_cli} ${content.project_name.name}`)
            res.send({
                code:1,
                msg:'创建成功'
            })
        }else {
            res.send({
                code:0,
                msg:'请先安装git'
            })
            return
        }
    }


})



app.post('/cd',multipartyMiddleware,(req,res)=>{
    let {path}=req.body;
    shell.cd(path)
    res.send({
        code:1,
        msg:'跳转成功',
        path:shell.pwd()
    })
})

//更新npm i
app.post('/update_npm',(req,res)=>{
    //打开cmd cd到指定目录
    let {name}=req.body;
    //拼接地址
    let path=shell.pwd();
    console.log(path)
    shell.exec(`start cmd /c "cd ${path.stdout} & cd ${name} & npm i"`)
    res.send({
        code:1,
        msg:'更新成功',
    })
})

//下载多个npm包
app.post('/download_npm',multipartyMiddleware,(req,res)=>{
    let {content}=req.body;
    let {name}=req.body;
    //进行扁平化处理将.name提取出来
    let arr=content.map(item=>item.name)
    //拼接成字符串
    let str=arr.join(' ')
    //拼接地址
    let path=shell.pwd();
    //打开cmd cd到指定目录
    shell.exec(`start cmd /c "cd ${path.stdout} & cd ${name} & npm i ${str}"`)
    res.send({
        code:1,
        msg:'下载成功',
    })
})


//创建文件夹
app.post('/create_dir',multipartyMiddleware,(req,res)=>{
   //拿到传过来的文件夹名
    let {name}=req.body;
    //创建文件夹
    //拼接地址
    let path=shell.pwd();
    shell.mkdir(`${path.stdout}/${name}`)
    res.send({
        code:1,
        msg:'创建成功'
    })
})


//删除文件
app.post('/delete_file',multipartyMiddleware,(req,res)=>{
    let {path}=req.body;
    delMkdir(path);
    res.send({
        code:1,
        msg:'删除成功'
    })
})


//创建i18n配置文件
app.get('/create_i18n',(req,res)=>{
    creati18n_git();
    res.send({
        code:1,
        msg:'创建成功'
    })
})

app.post('/custorm_git_download',multipartyMiddleware,(req,res)=>{
    let {git_path}=req.body;
    custorm_git_download(git_path);
    res.send({
        code:1,
        msg:'下载成功'
    })
})



//update_json文件
app.post('/update_json',multipartyMiddleware,(req,res)=>{
    let {content}=req.body;
    updateJsonFile(content);
    res.send({
        code:1,
        msg:'更新成功'
    })
})

//挂载 端口2022
app.listen(2022,()=>{
    console.log('后端服务启动成功','http://localhost:2022');
})
