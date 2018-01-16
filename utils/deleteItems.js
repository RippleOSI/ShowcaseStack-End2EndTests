var globals = require('../globals.js');

var fs = require('fs');
var file = "devDeleteList.json";
if (process.argv.length > 2) {
    file = process.argv[2];
}
console.log("Working with JSON: " + file);
var objects = JSON.parse(fs.readFileSync(String(file), 'utf8'));

for (var index = 0; index < objects.length; index++) {
    var object = objects[index];
    globals.deleteAllMatchingName(object["host"], object["path"], object["tab"], object["field"], object["value"])
}

