### 1. 使用preset

`npm install gulp -g && npm install gulp --save-dev`

`npm install babel-core babel-preset-es2015 --save-dev`

创建一个.babelrc文件来使用es2015 preset：

```javascript
{
  "presets": ["es2015"]
}
```

或者是不创建.babelrc，直接在package.json里面添加babel字段，如：

```javascript
"babel": {
  "presets": [
    "es2015"
  ]
}
```

创建gulpfile

```javascript
'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task("default",function(){
  return gulp.src("a.js")
             .pipe(babel({presets: ['es2015']}))
             .pipe(gulp.dest("dist"));
});
```

### 2. 使用browserify


`npm install gulp -g && npm install gulp --save-dev`

`npm install babel-core browserify vinyl-source-stream babelify --save-dev`

创建gulpfile

```javascript
'use strict';
var gulp = require('gulp') ;
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task("transpile",function(){
  return browserify("app.js")
             .transform("babelify")
             .bundle()
             .pipe(source("bundle.js"))
             .pipe(gulp.dest("dist"));
});

gulp.task("watch",["transpile"], function(){
  gulp.watch("**/*.js");
})

gulp.task("default",["transpile"]);
```

当一个 browserify 项目开始变大的时候，编译打包的时间也会慢慢变得长起来。虽然开始的时候可能只需花 1 秒，然后当你的项目需要建立在一些流行的大型项目的基础上时，它很有可能就变成 30 秒了。

这就是为什么 substack 写了 watchify 的原因，一个持续监视文件的改动，并且 只重新打包必要的文件 的 browserify 打包工具。用这种方法，第一次打包的时候可能会还是会花 30 秒，但是后续的编译打包工作将一直保持在 100 毫秒以下 —— 这是一个极大的提升。

watchify 并没有一个相应的 gulp 插件，并且也不需要有：你可以使用 vinyl-source-stream 来把你的用于打包的 stream 连接到 gulp 管道中。

```javascript
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

// 在这里添加自定义 browserify 选项
var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// 在这里加入变换操作
// 比如： b.transform(coffeeify);

gulp.task('js', bundle); // 这样你就可以运行 `gulp js` 来编译文件了
b.on('update', bundle); // 当任何依赖发生改变的时候，运行打包工具
b.on('log', gutil.log); // 输出编译日志到终端

function bundle() {
  return b.bundle()
    // 如果有错误发生，记录这些错误
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // 可选项，如果你不需要缓存文件内容，就删除
    .pipe(buffer())
    // 可选项，如果你不需要 sourcemaps，就删除
    .pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map
       // 在这里将变换操作加入管道
    .pipe(sourcemaps.write('./')) // 写入 .map 文件
    .pipe(gulp.dest('./dist'));
}
```
