var dbutil =  require('./dbutil.js');   // 引自己的模块一定要加./

function insertFileList(fileName, fileSize, filePath, stuNum, success) {
    var insert = 'insert into file_list (file_name, file_size, file_path, stu_num) values(?,?,?,?);'            // mysql语句
    var params = [fileName, fileSize, filePath, stuNum]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insert, params, (error, result) => {    // 使用query方法执行语句
        if (error == null) {
        success(result);
        } else {
            throw new Error(error)
        }
    })
    connection.end();
}

module.exports = {
    insertFileList
};
