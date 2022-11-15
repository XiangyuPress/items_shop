const shell = require('shelljs');


function delMkdir(path) {
    //删除文件夹
    shell.rm('-rf', path);
}

module.exports = delMkdir;
