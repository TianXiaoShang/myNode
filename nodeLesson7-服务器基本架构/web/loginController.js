var path = new Map();

// 接口回调，请求时被执行
function getData (request, response){
    response.writeHead(200);      // response返回数据
    response.write('hello');
    response.end();
}
path.set('/getData', getData);      // 每个接口对应的处理函数

module.exports.path = path;
