var net = require('net');
var fs = require('fs');
var path = require('path');
var globalConf = require('./config')


var server = net.createServer();
server.listen(globalConf.port, '127.0.0.2');
server.on('listening', () => {
    console.log('服务已启动');
})

server.on('connection', socket => {
    console.log('有新的连接');
    console.log(14, globalConf.basePath);
    socket.on('data', data => {
        var url = data.toString().split('\r\n')[0].split(' ')[1];
        try {
            console.log(path.join(globalConf.basePath, url), 1999)
            // var dataFile = fs.readFileSync(path.join(globalConf.basePath, url), 'utf-8');
            var dataFile = fs.readFileSync(path.join(globalConf.basePath, url));
            // socket.write('HTTP 200OK\r\nServer:Dws/1.1\r\nContent-type:text/html\r\n\r\n');
            socket.write('HTTP 200OK\r\n\r\n');
            socket.write(dataFile);
        } catch (e) {
            console.log(e);
            socket.write('HTTP 200OK\r\nServer:Dws/1.1\r\nContent-type:text/html\r\n\r\n<html><body><h1>404</h1></body></html>');
        }
        socket.end();
    });
});
