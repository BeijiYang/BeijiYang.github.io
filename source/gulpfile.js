var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer'); 
var wrap = require('gulp-wrap');

gulp.task('build', function(){
   gulp.src('pages/*.html')
       .pipe(wrap({src:'layout/default.html'}))
       .pipe(gulp.dest('..'));
 });

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


gulp.task('sass', function(){
  gulp.src('styles/main.scss')
      .pipe(sass()).on('error',handleError)
      .pipe(prefix())
      .pipe(gulp.dest('../styles'));
});

gulp.task('copy', function(){
  gulp.src('index.html')
      .pipe(gulp.dest('..'));
});

gulp.task('watch', function(){
  gulp.watch(['*.html'],['copy']);
  gulp.watch(['styles/*.scss'],['sass']);
});

gulp.task('default', ['sass','copy','watch']);