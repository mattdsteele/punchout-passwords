var gulp = require('gulp'),
  babel = require('gulp-babel'),
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
    root: '.',
    livereload: true
  });
});

gulp.task('default', ['babel', 'test', 'watch']);
