[ES6详细学习](#top)

- [基础架构](#基础架构)
- [任务自动化gulp](#任务自动化gulp)
- [编译工具babel，webpack](#编译工具babel)

```shell
├── server\  #后台接口(服务接口)
│   ├── 
│   └── 
├── app\    #前端
│   ├──  js\           #js
│   │    ├── class\
│   │    └── index.js      
│   ├──  css\          #css
│   └──  views\        #模板
│        ├── error.ejs     #错误模板
│        └── index.ejs     #入口模板
├── tasks\    #构建
│   ├──  util\        #构建工具集合
│   │    └── args.js      #yargs模块来开发自己的命令行工具集合-程序实现交互
│   ├──  scripts.js   #js脚本文件构建
│   ├──  pages.js     #页面模板构建
│   ├──  css.js       #css构建
│   ├──  server.js    #server构建
│   ├──  browser.js   #监听变化（js/pages/css）并调用以上文件中定义的gulp task
│   ├──  clean.js     #清空server\public和server\views目录
│   ├──  build.js     #defining gulp task sequence
│   └──  default.js   #defining default gulp task
├── .babelrc            #babel配置文件
├── gulpfile.babel.js   #gulp配置文件
└── package.json
```

<h3 id="基础架构">基础架构</h3>

- 业务逻辑
  - 页面
  - 交互
- 自动构建
  - 编译： 注意-IE8仅支持ES3
  - 辅助
    - 自动刷新
    - 文件合并
    - 资源压缩
    - 。。。
- 服务接口
  - 数据
  - 接口


[back to top](#top)

<h3 id="任务自动化gulp">任务自动化gulp</h3>

[back to top](#top)

<h3 id="编译工具babel">编译工具babel，webpack, webpack-stream</h3>

[back to top](#top)
