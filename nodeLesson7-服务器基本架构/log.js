var fs = require('fs');
var globalConfig = require('./config');

// 记录日志

var fileName = globalConfig.log_path + '/' + globalConfig.log_name;
function log(data) {
    // fs.writeFile(fileName, data + '\n', { flag: 'a' }, () => { });    // flag:a表示在原来基础上写入，不直接替换之前内容
    fs.appendFile(fileName, data + '\n', () => { });                     // append默认就是flag:a 追加写入，代替如上写法

    // 同步的方式(尽量不用)
    // fs.writeFileSync(fileName, 'asd2');
}

module.exports = log;

/**
 * 第三个默认参数options中的mode
 * 
 * { flag: 'a' ,mode:0o666}    // 0o代表8进制
 * 第一个数6：代表文件所有者的权限
 * 第二个数6：代表同组用户的权限
 * 第三个数6：非同组用户的权限
 * 
 * 其中每个数字有三个位分别对应可读、写、执行（如下）
 * r  w  x
 * 4  2  1
 * -------
 * 4 0 0    === 4  可读
 * 4 2 0    === 6  可读可写
 * 4 2 1    === 7  可读可写可执行
 * 4 0 1    === 5  可读可执行
 * ...
 */

/**
 * flag常用参数
 * r    read
 * rs   readSync
 * w    write
 * wx   排他写（写入的时候不允许其他人写）
 * a    追加      === fs.appendFile()
 * ax   排他追加 
 */
