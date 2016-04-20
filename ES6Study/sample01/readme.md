
- 模拟服务器端fake server -- json-server
- 使用gulp进行构建

```javascript
    "babel-core": "^6.7.6",
    "babel-preset-es2015": "^6.6.0",
    "babelify": "^7.2.0",
    "browserify": "^13.0.0",
    "vinyl-source-stream": "^1.1.0"
```

项目结构

```
/server
  - db.json
/source
  - api.js
  - app.js     --入口js
  - constants.js
  - post.js
  - ui.js
  - user.js
/dist
  bundle.js
package.json
gulpfile.js
index.html
```

安装 `npm install`

运行

- `json-server server/db.json`， 打开浏览器输入："http://localhost:3000/posts"
- `gulp default`, 使用浏览器直接打开index.html


