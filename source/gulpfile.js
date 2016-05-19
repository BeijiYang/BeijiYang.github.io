var gulp = require('gulp');
var consolidate = require('consolidate');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
consolidate.requires.lodash = require('lodash');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function(){
  return gulp.src('./assets/*')
    .pipe(imagemin({
      progressive: true,
      svoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('../images'));
});

gulp.task('browser-sync', ['build', 'sass', 'cp'],function(){
    browserSync({
        server: {
            baseDir: '..'
        }
    });
});

gulp.task('cp', function () {
  return gulp.src(['js/main.js','assets/*'], { base: '.' })
         .pipe(gulp.dest('..'));
});

gulp.task('rebuild',['build'], function(){
  browserSync.reload();
});

gulp.task('build', function(){
   gulp.src('pages/*.html')
       .pipe(wrap({src:'layout/default.html'}))
       .pipe(gulp.dest('..'));
 });

gulp.task('sass', function(){
  gulp.src('styles/main.scss')
      .pipe(sass()).on('error', handleError)
      .pipe(prefix())
      .pipe(gulp.dest('../styles'))
      .pipe(browserSync.reload({stream:true}));;
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('watch', function(){
  gulp.watch(['**/*.html'],['rebuild']);
  gulp.watch(['styles/*.scss'],['sass']);
});

gulp.task('default', ['browser-sync','watch']);