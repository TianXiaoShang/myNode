var net = require('net');
var socket = net.connect(12306, '127.0.0.1');

// connect监听连接
socket.on('connect', () => {
    console.log('已连接到服务器');
    console.log(socket.remoteAddress);
    console.log(socket.remotePort);
    console.log(socket.localAddress);
    console.log(socket.localPort);
})

// write发送数据
socket.write('hello server');

// 监听data接收数据
socket.on('data', (data) => {
    console.log(data.toString());
    socket.end();
})

// 监听关闭
socket.on('close', () => {
    console.log('连接已断开');
})

// 设置请求超时时间
socket.setTimeout(2000);
// 监听请求超时
socket.on('timeout', () => {
    console.log('请求超时啦！');
    socket.end();
    console.log('关完了');
})
