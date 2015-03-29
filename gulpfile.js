var gulp = require('gulp'),
  babel = require('gulp-babel'),
  path = require('path'),
  runSequence = require('run-sequence'),
  Builder = require('systemjs-builder'),
  notify = require('gulp-notify'),
  connect = require('gulp-connect');
  jasmine = require('gulp-jasmine');

gulp.task('babel', function() {
  return gulp.src(['index.js', 'test.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
gulp.task('test', function() {
  return gulp.src('dist/**/*.js')
    .pipe(jasmine())
    .on('error', notify.onError({
      title: 'Test failed'
    }));
});

gulp.task('watch', function() {
  gulp.watch(['*.js'], ['babel']);
  gulp.watch(['dist/**'], ['test']);
});

gulp.task('serve', function() {
  connect.server({
    root: 'web',
    livereload: true
  });
});

gulp.task('default', ['babel', 'test', 'watch']);

gulp.task('bundle', function(cb) {
  var Builder2 = require('systemjs-builder');
  var builder = new Builder2();
  builder.loadConfig('./config.js')
  .then(function() {
    builder.loader.baseURL = path.resolve('./');
    builder.buildSFX('app', 'web/app-built.js', {
      sourceMaps: true,
      config: { 
        sourceRoot: 'dist' ,
        baseURL: path.resolve('./')
      }
    }).then(function() {
      return cb();
    }).catch(function(ex) {
      cb(new Error(ex));
    });
  });
});

gulp.task('assets', function() {
  gulp.src('www/*')
  .pipe(gulp.dest('web'));
});

gulp.task('web', function(cb) {
  runSequence('bundle', 'assets', 'serve', cb);
});
