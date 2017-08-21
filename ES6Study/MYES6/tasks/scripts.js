import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';             //文件 files arbitrary chunk names.
import livereload from 'gulp-livereload';    //
import plumber from 'gulp-plumber';          //文件信息流, pipe拼接
import rename from 'gulp-rename';            //文件重命名
import uglify from 'gulp-uglify';            //压缩
import {log,colors} from 'gulp-util';        //输出log
import args from './util/args';

gulp.task('scripts',()=>{
  return gulp.src(['app/js/index.js'])
    .pipe(plumber({
      errorHandle:function(){

      }
    }))
    .pipe(named())
    .pipe(gulpWebpack({
      module:{
        loaders:[{ test:/\.js$/, loader:'babel' }]
      }
    }),null,(err,stats)=>{      //错误处理
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })
    .pipe(gulp.dest('server/public/js'))
    .pipe(rename({
      basename:'cp',
      extname:'.min.js'
    }))
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
    .pipe(gulp.dest('server/public/js'))
    .pipe(gulpif(args.watch,livereload()))   //如命令行中有watch则热加载
})
