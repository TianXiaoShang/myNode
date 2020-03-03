var net = require('net');

// 创建服务
var server = net.createServer();

// listen方法进行监听端口（close方法用来关于端口监听）
server.listen(12306, '127.0.0.1');


// 服务端监听事件
server.on('listening', function () {
    console.log('服务已启动');
    console.log('address:', server.address());
});
// server.on('connection', function (socket) {
//     console.log('有新的连接');

//     //监听data接受数据
//     socket.on('data', (data) => {
//         console.log(data.toString());
//         socket.write('hello client');
//     })

//     // 监听客户端关闭
//     socket.on('close', () => {
//         console.log('客户端已关闭');
//         server.close();
//     })

// })

// 监听server关闭
server.on('close', () =>{
    console.log('服务已关闭');
})


//close跟error事件不常用，服务器一般以杀线程的方式结束


