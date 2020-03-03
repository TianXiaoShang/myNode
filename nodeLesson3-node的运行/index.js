
var test = require('./test.js')

// test.obj.a = 44;     // 会改变被引入源对象


// // 以下证明node是运行在一个函数中的，且实参为以下5个
console.log(arguments[0] === exports );         // true
console.log(arguments[1] === require );         // true
console.log(arguments[2] === module );          // true
console.log(arguments[3] === __filename );      // true
console.log(arguments[4] ===  __dirname);       // true
console.log(arguments[5]);                      // undefined


console.log(module);       // module.children就是引入的test模块，引入谁就是children
// module对象中的loaded表示该模块是否加载完毕，子模块被加载完了为true，父模块则在打印时还没加载完，为false

    