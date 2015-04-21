var spock = require('spock');
var through = require('through2');
var filter = require('gulp-ignore');

var BUILD_DIR = './.build'; // TODO DRY

var html = module.exports = function () {
  // TODO move spock code here and deprecate spock
  // TODO or will spock have to be augmented to handle new features I need?  Should those be moved here?
  return through()
    .pipe(filter.include('.html'))
    .pipe(spock({outputDir: BUILD_DIR}));
};
