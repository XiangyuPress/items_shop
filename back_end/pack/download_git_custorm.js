const shell=require('shelljs')

function custorm_git_download(git_path){
    shell.exec(`git clone ${git_path}`)
}

module.exports={
    custorm_git_download
}
