var fs = require('fs')
var conf = fs.readFileSync('./server.conf')

// 将配置文件读取为对象并导出
var globalConfig = {};
var configs = conf.toString().split('\r\n')
for (let i = 0; i < configs.length; i++) {
    const el = configs[i];
    var temp = el.split('=');
    if (temp.length === 2) {
        globalConfig[temp[0]] = temp[1];
    }
}
module.exports = globalConfig;


