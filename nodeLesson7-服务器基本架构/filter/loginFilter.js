var url = require('url');
var globalConfig = require('../config');

function loginFilter(request, response) {
    var pathName = url.parse(request.url).pathname;   // url.parse进行url解析
    if (
        pathName == '/login.html' 
        || pathName === 'login' 
        || pathName == '/loginForServer' 
        || isStaticRequest(pathName)
    ) {
        return true;
    }
    if(request.headers.cookie){
        var cookies = request.headers.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            if(cookie.split('=')[0].trim() == 'id'){
                return true;
            }
        }
    }
    response.writeHead(302, { 'location': '/login.html' });
    response.end();
    return false;
}
module.exports = loginFilter;


// 判断是否为静态文件类型请求
function isStaticRequest(pathName) {
    var types = globalConfig.static_file_type;
    for (let i = 0; i < types.length; i++) {
        const el = types[i];
        const len = el.length;
        if (el == '.html') {
            continue;
        }
        if (pathName.indexOf(el) === pathName.length - len) {
            return true;
        }
    }
}
