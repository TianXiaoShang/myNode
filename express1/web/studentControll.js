var studentDao = require('../dao/studentDao');
var url = require('url');

var path = new Map();
function getAllStudent(request, response){
    studentDao.queryAllStudent(function (result){
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    })

}
path.set('/api/getAllStudent', getAllStudent)

function addStudent(request, response){
    var params = url.parse(request.url, true).query;
    var paramsArr = [params.stuNum, params.name, params.stuClass, params.age, params.pwd];
    studentDao.insertAllStudent(...paramsArr,function (result){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write('添加成功！');
        response.end();
    })

}
path.set('/api/addStudent', addStudent)

function login(request, response){
    var params = url.parse(request.url, true).query;
    studentDao.queryStudentByStuNum(params.stuNum, function (result){
        if(result && result.length > 0 && result[0].pwd == params.pwd){
            // 写cookie
            response.cookie('id', result[0].id);
            response.redirect('/api/getAllStudent');
        }else{
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write('用户名或密码错误');
            response.end();
        }

    })

}
path.set('/login', login)

module.exports.path = path;
