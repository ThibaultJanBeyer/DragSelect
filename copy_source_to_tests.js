var fs = require('fs');
var path = require("path");

var source = path.resolve(__dirname + '/src/DragSelect.js');
var target = path.resolve(__dirname + '/tests/DragSelect.js');

console.log('copying ' + source + ' to ' + target);
fs.createReadStream(source).pipe(fs.createWriteStream(target));