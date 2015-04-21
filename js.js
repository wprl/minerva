var path = require('path');
var brfs = require('brfs');
var mkdirp = require('mkdirp');
var envify = require('envify');
var through = require('through2');
var filter = require('gulp-ignore');
var uglifyify = require('uglifyify');
var shim = require('browserify-shim');
var browserify = require('browserify');

var js = module.exports = function () {
  var b = browserify();
  b.transform(envify);
  b.transform(brfs);
  b.transform(shim);
  b.transform({ global: true }, uglifyify);

 // b.add(path.resolve(CWD, incomingfile), { basedir: CWD });

  return through()
    .pipe(filter.include('.js'))
    .pipe(b.bundle());
}
