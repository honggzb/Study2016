var gulp = require('gulp') ;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
// import browserify from 'browserify';
// import source from 'vinyl-source-stream';

gulp.task("transpile",function(){
  return browserify("source/app.js")
             .transform("babelify")
             .bundle()
             .pipe(source("bundle.js"))
             .pipe(gulp.dest("dist"));
});

gulp.task("watch",["transpile"], function(){
  gulp.watch("**/*.js",["transpile"]);
})

gulp.task("default",["transpile"]);
