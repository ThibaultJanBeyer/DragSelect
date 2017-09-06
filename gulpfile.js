var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var ghPages = require('gulp-gh-pages');

gulp.task('js', function () {
  gulp.src('./src/DragSelect.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('ds.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
  gulp.src('./src/example.css')
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
  gulp.src('./src/index.html')
    .pipe(htmlhint())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('quicktest', function () {
  gulp.src('./src/quicktest.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['js', 'html', 'css', 'quicktest']);
