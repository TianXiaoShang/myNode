var http = require('http');
var url = require('url');
var fs = require('fs');
var globalConfig = require('./config');
var loader = require('./loader');
var log = require('./log');

console.log(globalConfig, 8);
// http跟net一样可以创建服务，底层也是调用net的createServer方法
http.createServer((request, response) => {
    // console.log(request.url);                      ///login.html?a=1&b=2 在http中已经帮我们将url处理好，不需要字符串提取
    
    var pathName = url.parse(request.url).pathname;   // url.parse进行url解析
    log(pathName);                                    // 日志记录请求路径参数等信息
    // console.log(pathName);                         // login.html
   
    var params = url.parse(request.url, true).query;  // 第二个参数传true可以解析成对象，否则是拼接的字符串
    // console.log(params);                           // { a: '1', b: '2' }
    // 以上方法比net创建方法进行请求取参数方便很多。所以我们可以用http代替net起服务；

    
    // 业务部分
    var isStatic = isStaticRequest(pathName);         // 检测类型
    if(isStatic){                                     // 处理静态文件请求
        try{
            var data = fs.readFileSync(globalConfig.page_path + pathName)
            response.writeHead(200);
            response.write(data);
            response.end();
        }catch(e){
            response.writeHead(404);
            response.write('<html><body><h1>404 NotFound</h1></body></html>');
            response.end();
        }
    }else{         // 处理数据接口请求
        if(loader.get(pathName)){
            try{
                loader.get(pathName)(request, response);
            }catch (e){
                response.writeHead(500);
                response.write('<html><body><h1>500 NotFound</h1></body></html>');
                response.end();
            }   
        }else{
            response.writeHead(404);
            response.write('<html><body><h1>404 NotFound</h1></body></html>');
            response.end();
        }
    }

}).listen(globalConfig.port)
log('服务已启动');

// 判断是否为静态文件类型请求
function isStaticRequest(pathName){
    var types = globalConfig.static_file_type;
    for (let i = 0; i < types.length; i++) {
        const el = types[i];
        const len = el.length;
        if(pathName.indexOf(el) === pathName.length - len){
            return true;
        }
    }
}
