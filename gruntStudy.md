## Grunt常用的插件

- grunt-contrib-clean：删除文件或目录的插件
- grunt-contrib-copy：复制文件或目录的插件
- grunt-contrib-concat：合并任意文件
- grunt-contrib-compress：压缩文件和目录成为zip包(不是很常用)
- grunt-contrib-jshint：javascript代码检查
- grunt-contrib-mincss：css压缩
- grunt-css-combo：css合并的插件(我的同事紫英写的)
- grunt-contrib-stylus：less/sass/stylus预编译
- grunt-contrib-watch：实时监听插件
- grunt-contrib-imagemin：图片压缩工具插件
- grunt-karmakarma单测回归插件

### 1. grunt-contrib-clean -删除文件或目录的插件

```javascript
clean: {
  build: {
    src: ["path/to/dir/one", "path/to/dir/two"]
  }
}
```

### 2. grunt-contrib-copy -复制文件或目录的插件

```javascript
copy: {
  main: {
    files: [
      {src: ['path/*'], dest: 'dest/', filter: 'isFile'}, // 复制path目录下的所有文件
      {src: ['path/**'], dest: 'dest/'},        // 复制path目录下的所有目录和文件
    ]
  }
}
```

### 3. grunt-contrib-concat-  合并任意文件

```javascript
grunt.loadNpmTasks('grunt-contrib-concat');
//向文件追加一些额外信息
grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),    
        concat: {
            options: {
                //文件内容的分隔符
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['src/*.js'],
                dest: 'build/built.js'
            }
        }
    });
//自定义进程函数，比如你需要在合并文件前，对文件名进行处理等。
grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                 // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';\n",
                process: function(src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                                 src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist: {
                src: ['src/*.js'],
                dest: 'build/built.js'
            }
        }
    });
```

### 4. grunt-contrib-compress- 压缩文件和目录成为zip包，不是很常用

```javascript
compress: {
  main: {
    options: {
      archive: 'archive.zip'
    },
    files: [
      {src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, path下所有的js
      {src: ['path/**'], dest: 'internal_folder2/'}, // path下的所有目录和文件
    ]
  }
}
```

### 5. grunt-contrib-jshint -用于javascript代码检查，发布js代码前执行jshint任务，可以避免出现一些低级语法问题

jshint拥有非常丰富的配置，可以自由控制检验的级别。

```javascript
module.exports = function(grunt) {
    grunt.initConfig({  
        pkg: grunt.file.readJSON('package.json'), //读取package.json的内容，形成个json数据
        jshint: {
            options:
                curly: true,  //对于简单类型，使用===和!==，而不是==和!=      
                eqeqeq: true, //对于首字母大写的函数（声明的类），强制使用new
                newcap: true, //禁用arguments.caller和arguments.callee
                noarg: true, //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true, //查找所有未定义变量
                undef: true,  //查找类似与if(a = 0)这样的代码
                boss: true,
                node: true  //指定运行环境为node.js
            },
            //具体任务配置
            files: {
                src: ['src/*.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint'); // 加载指定插件任务
    grunt.registerTask('default', ['jshint']); // 默认执行的任务
};
```

jshint比较有意思的是还可以结合grunt-contrib-concat插件使用，在合并文件前（后）对js进行检查。

```javascript
grunt.initConfig({
  concat: {
    dist: {
      src: ['src/foo.js', 'src/bar.js'],
      dest: 'dist/output.js'
    }
  },
  jshint: {
    beforeconcat: ['src/foo.js', 'src/bar.js'],
    afterconcat: ['dist/output.js']
  }
});
```

类似的还有个grunt-contrib-csslint插件，用于css代码检查，用法基本一样，只是配置上存在差异，貌似css检查的需求有些鸡肋，就不再演示了。

### 6. grunt-contrib-mincss- 用于css压缩

```javascript
mincss: {
  compress: {
    files: {
      "path/to/output.css": ["path/to/input_one.css", "path/to/input_two.css"]
    }
  }
}
```

### 7. grunt-css-combo - 我的同事紫英写的css合并的插件，用于css分模块书写时的合并（如果你不使用less、sass、stylus，建议使用这个插件）。

grunt.initConfig({
  css_combo: {
    files: {
      'dest/index.combo.css': ['src/index.css'],
    },
  },
})
文件目录的demo请看[github](https://github.com/daxingplay/grunt-css-combo/tree/master/test/fixtures)

src/index.css的代码如下：

```
@import "./mods/mod1.css";
@import "./mods/mod2.css";
#content {}
```

通过@import来合并模块css文件

### 8. grunt-contrib-stylus - less/sass/stylus预编译

```javascript
stylus: {
    options: {
              paths: ['src'],   //指定要扫描的目录（针对@import内的路径）
                //指定将图片路径转成base64数据的函数（比如配置urlfunc:"embedurl"，扫描embedurl(test.png)）
                urlfunc: 'embedurl',
                import: [      //  @import 'foo', 'bar/moo', 每一个.styl文件
                    'foo',
                    'bar/moo'
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '*.styl',
                        dest: 'src',
                        ext: '.css'
                    }
                ]
            }
        }
```
- sass推荐使用grunt-contrib-compass。
- 如果你使用webstrom或idea，其实不需要grunt来处理css的预编译，IDE已经内置处理了。）
- 当然亲可以使用一些编译工具，比如livereload（livereload非常强大，但win平台的软件很弱）和koala。

### 9. grunt-contrib-watch -实时监听插件

```javascript
watch: {
    options: {
        spawn: false
    },
    scripts: {
        files: [ '<%= pkg.version %>/**/*.coffee' ],
        tasks: [ 'coffee']
    }
}

监听源码目录下所有的.coffee文件的修改，触发coffee任务（编译coffee文件）

- spawn配置一般禁掉，设置为true时，运行任务会开启子进程处理，可能会出现不稳定的问题
- files：监听哪些文件的修改
- tasks：文件修改后触发哪些任务

grunt-contrib-watch拥有丰富的配置，一般采用默认配置即可，grunt-contrib-watch可以结合livereload插件使用，可以实现文件发生改变后刷新页面，这个功能很有意思

```javascript
grunt.initConfig({
  watch: {
    options: {
      livereload: true,
    },
    css: {
      files: ['public/scss/*.scss'],
      tasks: ['compass'],
    },
  },
});
```

livereload会开启个服务器，默认端口号为35729。

在页面中引入监控脚本：`<script src="http://localhost:35729/livereload.js"></script>`,  或者安装livereload的浏览器插件

### 10. grunt-contrib-imagemin，图片压缩工具插件, 能够快速的压缩工程内的图片

```javascript
imagemin: {
     dynamic: {
         files: [{
             expand: true,
             cwd: 'src/',
             src: ['**/*.{png,jpg,gif}'],
             dest: 'dist/'               
         }]
     }
 }
```


### 11. grunt-karma：karma单测回归插件，webstrom内置karma回归功能

```javascript
karma: {
  unit: {
    configFile: 'karma.conf.js'
  }
}
```
