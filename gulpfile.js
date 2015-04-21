// ## Dependencies
var minerva = require('.');
var http = require('http');
var gulp = require('gulp');
var mkdirp = require('mkdirp');
var config = require('config');
var through = require('through2');
var filter = require('gulp-ignore');
var wainwright = require('wainwright');

// ## Private Module Members
var CWD = __dirname + '/example';

// Show more error detail.
gulp.onAll(function (e) {
  if (!e.err) return;
  console.log(e.err.stack);
});
process.on('uncaughtException', function (error) {
  console.error(error.stack);
});

function done (callback) {
  return through(null, function () {
    this.emit('end');
    callback(null);
  });
}

// ## Tasks
// Clean the build directory.
gulp.task('clean', function (callback) {
  var rimraf = require('rimraf');
  rimraf(config.build.path, callback);
});

gulp.task('build.all', ['clean'], function (callback) {
  // Make sure build dir is present
  mkdirp.sync(config.build.path);
  // Load the main file(s)
  gulp.src('./example/app.html')
    // Apply templates, other static generation
    .pipe(wainwright({ metadata: { templateDirectory: './example/' }}))
    // Detect and build all needed files
    .pipe(minerva())
    // Output to the build directory
    .pipe(gulp.dest(config.build.path))
    // Done
    .pipe(done(callback));
});

// Build the sitemap.
gulp.task('build.sitemap', ['build.all'], function (callback) {
  var sitemap = require('gulp-sitemap');
  gulp.src(config.build.path + '/**/*').pipe(filter.include('.html')).pipe(sitemap({
    siteUrl: config.site.url
  })).pipe(gulp.dest(config.build.path)).pipe(done(callback));
});

// Build all the things!
gulp.task('build', ['clean', 'build.all', 'build.sitemap']);

// Builds app and starts a preview development server.
gulp.task('preview', ['build'], function () {
  var connect = require('connect');
  var app = connect();
  app.use(connect.static(config.build.path));
  http.createServer(app).listen(config.site.port);
  console.log('Preview server started on port', config.site.port);
  // watch and rebuild
  gulp.watch(paths.project, ['build']);
});
