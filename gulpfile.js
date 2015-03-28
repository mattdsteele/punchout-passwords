var gulp = require('gulp'),
  babel = require('gulp-babel'),
  jasmine = require('gulp-jasmine');

gulp.task('babel', function() {
  return gulp.src(['index.js', 'test.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
gulp.task('test', function() {
  return gulp.src('dist/**/*.js')
    .pipe(jasmine());
});

gulp.task('watch', function() {
  gulp.watch(['*.js'], ['babel']);
  gulp.watch(['dist/**'], ['test']);
});

gulp.task('default', ['babel', 'test', 'watch']);
