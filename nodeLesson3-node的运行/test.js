console.log('wo shi test')
var a = 123;
var obj = {
    a: 1,
    b: 2
}
var b = 456;


// export跟module.exports最初指向同一个对象，两者同时使用最终导出module.export
module.exports.b = b;
exports.a = a;


// console.log(module);       

