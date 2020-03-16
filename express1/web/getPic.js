var url = require('url');
var path = new Map();
var fs = require('fs');

function getPic(request, response){
    var params = url.parse(request.url, true).query;
    try{
        var data = fs.readFileSync('./' + params.path);   // 为什么这里是./？？？？
        response.writeHead(200);
        response.write(data);
        response.end();
    } catch(e){
        response.writeHead(404);
        response.end();
    }
}
path.set('/getPic', getPic);

module.exports.path = path;
