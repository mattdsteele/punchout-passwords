var gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp.task('default', function() {
  return gulp.src('test.js', { read: false })
    .pipe(mocha());
});
