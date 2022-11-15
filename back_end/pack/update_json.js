
//更新本地文件
let fs = require('fs')
let path = require('path')
let download = 'D:\\开源项目\\可视化创建项目\\fore_end\\project\\dowload_pack.json'




function updateJsonFile(obj_set) {
    fs.readFile(download, 'utf8', function (err, data) {
        if (err) throw err;
        let obj = JSON.parse(data)
        obj.git_download= obj_set
        let str = JSON.stringify(obj)
        fs.writeFile(download, str, function (err) {
            if (err) throw err;
        })
    })
}

module.exports = {
    updateJsonFile
}
