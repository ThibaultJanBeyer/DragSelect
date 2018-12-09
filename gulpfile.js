var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var babel = require('gulp-babel');

gulp.task('js', function() {
  gulp
    .src('./src/DragSelect.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('ds.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  gulp
    .src('./src/example.css')
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
  gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('quicktest', function() {
  gulp.src('./src/quicktest.html').pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['js']); 
  gulp.watch('src/*.css', ['css']); 
  gulp.watch('src/*.html', ['html']); 
});

gulp.task('default', ['js', 'html', 'css', 'quicktest']);
gulp.task('devl', ['default', 'watch']);
