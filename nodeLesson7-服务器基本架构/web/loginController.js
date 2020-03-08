var path = new Map();
var url = require('url');
var sutdentService = require('../server/studentService');


// 接口回调，请求时被执行
function getData(request, response) {
    sutdentService.queryAllStudent((result) => {
        var resultArr = [];
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            resultArr.push(item.name)
        }
        response.writeHead(200);      // response返回数  据
        response.write(resultArr.toString());
        response.end();
    });
}
path.set('/getData', getData);      // 每个接口对应的处理函数

function login(request, response) {
    // post请求，监听data事件
    request.on('data', function (data){
        var stuNum = data.toString().split('&')[0].split('=')[1];
        var password = data.toString().split('&')[1].split('=')[1];
        sutdentService.queryStudentByStuNum(stuNum, (result) => {
            var res = '';
            if (result == null || result.length == 0) {
                res = "Fail"
            } else {
                if (result[0].pwd === password) {
                    res = "OK"
                } else {
                    res = "Fail"
                }
            }
            response.writeHead(200);      // response返回数  据
            response.write(res);
            response.end();
        })
    })
}
path.set('/login', login);

// 来自form表单的请求
function loginForServer(request, response) {
    request.on('data', function (data){
        var stuNum = data.toString().split('&')[0].split('=')[1];
        var password = data.toString().split('&')[1].split('=')[1];
        sutdentService.queryStudentByStuNum(stuNum, (result) => {
            var res = '';
            if (result == null || result.length == 0) {
                res = "Fail"
            } else {
                if (result[0].pwd === password) {
                    // 服务端做重定向，浏览器看到302会帮助做跳转
                    response.writeHead(302, {'location': '/main.html'});      // response返回数  据
                    response.end();
                    return;
                } else {
                    res = "Fail"
                }
            }
            response.writeHead(404);      // response返回数  据
            response.write(res);
            response.end();

        })
    })
}
path.set('/loginForServer', loginForServer);

module.exports.path = path;
