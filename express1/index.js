var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');
var cookie = require('cookie-parser');
var multer = require('multer');

var app = new express();
app.use(express.static(globalConfig.page_path))        // 静态文件访问
app.use(cookie());                                     // 使用cookie-parser进行cookie解析
var uploadSingle = multer({ dest:'./file/' });         // 创建文件上传对象

app.get('/api/*', function(request, response, next){   // 拦截器
    if(request.cookies.id){                            // 拿cookie
        next();
    }
    else{
        response.redirect('/login.html');              // 重定向
    }
});

app.get('/api/getAllStudent', loader.get('/api/getAllStudent'));
app.get('/api/addStudent', loader.get('/api/addStudent'));
app.get('/login', loader.get('/login'));
app.post('/upload', uploadSingle.single('file'), loader.get('/upload'));     // filt表示哪个字段是文件
app.get('/getPic', loader.get('/getPic'))


app.listen(globalConfig.port);
