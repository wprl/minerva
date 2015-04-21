var js = require('./js');
var css = require('./css');
var html = require('./html');
var pass = require('./pass');
var merge = require('gulp-merge');
var through = require('through2');

var minerva = module.exports = function () {
  /* file comes in
  it is built by being piped to br, rework, or vulcanize
  it is piped through something that detects external dependencies
  those deps are piped in as a new file (step 1)
  if they're not processable (image, etc.) just pass them over to .build
  all files are outputed */

  return through().pipe(merge(html(), js(), css(), pass()));
};
