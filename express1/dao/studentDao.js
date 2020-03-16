var dbutil =  require('./dbutil.js');   // 引自己的模块一定要加./

function queryAllStudent(success) {
    var querySql = 'select * from student;'            // mysql语句
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, (error, result) => {    // 使用query方法执行语句
        if (error == null) {
            success(result);
        } else {
            throw new Error(error)
        }
    })
    connection.end();    // 记得关闭连接，防止占用系统资源
}
// queryAllStudent();

function insertAllStudent(stuNum, name, stuClass, age, pwd, success){
    var insert = 'insert into student (stu_num, name, class, age, pwd) values(?,?,?,?,?);'            // mysql语句
    var params = [stuNum, name, stuClass, age, pwd]
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





function queryStudentByClassAndAge(classNum, age){
    // var querySql = 'select * from student where class =' + classNum +  ';'         
    var querySql = 'select * from student where class = ? and age = ?;'     // 这里的问号会自动拼接传入query方法的参数
    var args = [].slice.call(arguments);    // 多个sql参数传数组，单个可直接传

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, args, (error, result) => {   // 把sql语句查询参数放到query方法的第二个参数，以防止sql注入；
        if (error == null) {
            console.log(result);
        } else {
            console.log(error);
        }
    })
    connection.end();    // 记得关闭连接，防止占用系统资源
}
// queryStudentByClassAndAge(2, 18);


function queryStudentByStuNum(stuNum, success){
    var querySql = 'select * from student where stu_num = ?;'     

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, stuNum, (error, result) => {  
        if (error == null) {
            success(result);
        } else {
            throw new Error(error)
        }
    })
    connection.end();    
}



module.exports = {
    queryAllStudent,
    queryStudentByClassAndAge,
    queryStudentByStuNum,
    insertAllStudent
};
