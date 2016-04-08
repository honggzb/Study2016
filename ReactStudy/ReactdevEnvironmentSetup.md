
- atom
  - language-babel
- node
  - browserify

## 1. Environment setup 1 - using browser-sync and react itself

### 1.1 mocking server and realtime monitoring

`npm install --save browser-sync`

modify package.json

```javascript
"scripts": {
  "dev": "browser-sync start --server --files *.*"
},
```

run in command line :  `npm run dev`

### 1.2 import JXF transformer support

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
<script type="text/jsx;harmony=true" src="app.jsx">
```

## 2. Environment setup 2 - using webpack

### 2.1 packages need

```
npm install --save react
npm install --save react-dom
npm install --save-dev webpack
npm install webpack-dev-server -g
npm install --save-dev babel-loader
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-react
```

### 2.2 codes

```javascript
//create webpack.config.js in root directory
module.exports = {
  entry:  './app-client.jsx',
      output: {
        filename: "public/bundle.js"
      },
      module:{
        loaders: [
          {
            exclude: /(node_modules|app-server.js)/,
            loader: 'babel',
            query:{ presets:['es2015', 'react'] }
          }
        ]
      }
};

//edit package.json
...
"scripts": {
  "prestart": "webpack",
  "start": "node app-server.js"
},
...
//app-client.js in root directory
import React from 'react';
import ReactDOM from 'react-dom';
import APP from './components/APP.js';
ReactDOM.render(<APP/>, document.getElementById('react-container'));

//APP.js in components directory
var React = require('react');
var APP = React.createClass({
  render: function() {
    return (<h1>Hello world from React.</h1>);
  }
});
module.exports = APP;
```

index.html

```html
<script type="text/javascript" src="bundle.js"></script>
```

### 2.3 fire up the Webpack dev server to see our components on the page live in action

`webpack-dev-server --progress --colors`

watch as terminal in browser : http://localhost:8080/webpack-dev-server/

### 2.4 running app

`npm start`


> references
- [霹雳渔](http://www.piliyu.com/)
- [Setting up React for ES6 with Webpack and Babel](https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html)
