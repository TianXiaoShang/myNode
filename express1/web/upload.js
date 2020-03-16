var fileListDao = require('../dao/fileListDao');

var path = new Map();
function upLoad(request, response){
    var params = [request.file.originalname, request.file.size, request.file.path, request.cookies.id]
    fileListDao.insertFileList(...params, function (e){
        response.end(request.file.path);
    })
}
path.set('/upload', upLoad);

module.exports.path = path;
