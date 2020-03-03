var fs = require('fs')
var conf = fs.readFileSync('./server.conf')

// 将配置文件读取为对象并导出
var globalConfig = {};
var configs = conf.toString().split('\r\n')
for (let i = 0; i < configs.length; i++) {
    const el = configs[i];
    var temp = el.split('=');
    if (temp < 2) {
        continue;
    } else {
        globalConfig[temp[0]] = temp[1];
    }
}
if (globalConfig.static_file_type) {
    globalConfig.static_file_type = globalConfig.static_file_type.split('|');
} else {
    throw new Error('配置文件异常，缺少：static_file_type');
}
module.exports = globalConfig;


// // 异步的方法读取(不可取，这样在引入时无法获取到导出的globalConfig)
// fs.readFile('./server.conf', (err, conf)=> {
//     var globalConfig = {};
//     var configs = conf.toString().split('\r\n')
//     for (let i = 0; i < configs.length; i++) {
//         const el = configs[i];
//         var temp = el.split('=');
//         if (temp < 2) {
//             continue;
//         } else {
//             globalConfig[temp[0]] = temp[1];
//         }
//     }
//     if (globalConfig.static_file_type) {
//         globalConfig.static_file_type = globalConfig.static_file_type.split('|');
//     } else {
//         throw new Error('配置文件异常，缺少：static_file_type');
//     }
//     console.log(globalConfig, 40);
//     module.exports = globalConfig;
// })


