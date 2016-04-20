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
