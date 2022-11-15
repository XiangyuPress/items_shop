const shell = require('shelljs');
let i18n_git='https://github.com/Fnlock1/Fnlock1-items_shop_i18n_template.git'

//创建i18n配置文件
function createI18nMkdir() {
    shell.exec(`npm install vue-i18n`);
    shell.exec(`git clone ${i18n_git} i18n`);
}

module.exports = createI18nMkdir;
