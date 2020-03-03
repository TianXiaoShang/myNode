var fs = require('fs');
var globalConfig = require('./config');

// 循环引入对应路径web下文件
// 并导出这些文件中所有的接口及对应的方法集合
// var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globalConfig['web_path']);
for (let i = 0; i < files.length; i++) {
    const item = files[i];
    var temp = require('./' + globalConfig['web_path'] + '/' + item);
    if (temp.path) {
        for (const [key, value] of temp.path) {
            if(!pathMap.get(key)){
                pathMap.set(key, value);
            }else{
                throw new Error('url path重复，url:' + key)
            }
            // controllerSet.push(temp);
        }
    }
}

module.exports = pathMap;



// console.log(controllerSet, controllerSet[0]['path'].get('/getData')());
