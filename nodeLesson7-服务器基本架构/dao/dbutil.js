var mysql = require('mysql');
// console.log(mysql);

// var connection = mysql.createConnection({    // 创建连接数据库
//     host: '127.0.0.1',
//     port: '3306',
//     user: 'root',
//     password: 'lq952467',
//     database: 'school'
// })

// 保证每次都是新的链接
function createConnection() {
    var connection = mysql.createConnection({    // 创建连接数据库
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'lq952467',
        database: 'school'
    })
    return connection;
}
module.exports.createConnection = createConnection;
