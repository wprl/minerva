var through = require('through2');
var rework = require('gulp-rework');
var filter = require('gulp-ignore');
var imports = require('rework-import');
var urls = require('rework-plugin-url');

var css = module.exports = function (options) {
  var options = {
   // sourcemap: options.build.sourceMaps,
    compress: true
  };

  return through().pipe(filter.include('.css')).pipe(rework(
    imports(),
    urls(function (url) {
      // Detect font, image, etc, copy to output while rewriting paths to match outputed file paths
    }),
    options
  ));
};
