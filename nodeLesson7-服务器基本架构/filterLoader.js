var fs = require('fs');
var globalConfig = require('./config');

var filterSet = [];

var files = fs.readdirSync(globalConfig['filter_path']);
for (let i = 0; i < files.length; i++) {
    const item = files[i];
    var temp = require('./' + globalConfig['filter_path'] + '/' + item);
    filterSet.push(temp);
}


module.exports = filterSet;
