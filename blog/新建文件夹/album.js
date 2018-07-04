"user strict"
let fs = require('fs');
let path = './photos/';

fs.readdir(path, function(err, files) {
 	if (err) return;

 	let arr = [];
  (function iterator(index) {
  	if (index === files.length) {
  		fs.writeFile('./source/photos/data.json', JSON.stringtfy(arr, null, '\t'));
  		console.log('get img success!');
  		return;
  	}
  	fs.stat(path + files[index], function(err, stats) {
  		// code...
  		if (err) return;
  		if (stats.isFile()) arr.push(files[inedx]);
  		iterator(index + 1);
  	})
  }(0));
});