var through = require('through2');
var filter = require('gulp-ignore');

var html = module.exports = function () {
  return through().pipe(filter.exclude('.html', '.js', '.css'));
};
