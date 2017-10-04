[KOA+KOA-router学习](#top)

- [1. Koa](#Koa)
- [2. Koa-Router中间件](#Koa-Router)
- [3. 搭建api服务器](#搭建api服务器)

**koa2使用了ES7的语法**

<h3 id="Koa">1. Koa</h3>

由 Express 原班人马打造的 koa，致力于成为一个更小、更健壮、更富有表现力的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升常用错误处理效率。Koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手

**1.1 简单的设计**

```javascript
var koa = require('koa');
var app = koa();
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});
// response
app.use(function *(){
  this.body = 'Hello World';
});
app.listen(3000);
```

**1.2 执行koa**

执行koa时需要在`—-harmony`模式下运行，为了方便可以将node设置为默认启动harmony模式的别名：`alias node='node --harmony'`

**1.3 Cascading**

Koa 中间件以一种非常传统的方式级联起来，也就是这里所谓的Cascading。

在以往的 Node 开发中，频繁使用回调不太便于展示复杂的代码逻辑，在 Koa 中，我们可以写出真正具有表现力的中间件。与 Connect 实现中间件的方法相对比，Koa 的做法不是简单的将控制权依次移交给一个又一个的中间件直到程序结束，Koa 执行代码的方式有点像回形针，用户请求通过中间件，遇到 yield next 关键字时，会被传递到下一个符合请求的路由（downstream），在 yield next 捕获不到下一个中间件时，逆序返回继续执行代码（upstream）。

下边这个例子展现了使用这一特殊方法书写的 Hello World 范例：一开始，用户的请求通过 x-response-time 中间件和 logging 中间件，这两个中间件记录了一些请求细节，然后「穿过」 response 中间件一次，最终结束请求，返回 「Hello World」。

当程序运行到 yield next 时，代码流会暂停执行这个中间件的剩余代码，转而切换到下一个被定义的中间件执行代码，这样切换控制权的方式，被称为 downstream，当没有下一个中间件执行 downstream 的时候，代码将会逆序执行。

```javascript
var koa = require('koa');
var app = koa();
// x-response-time
app.use(function *(next){
  // (1) 进入路由
  var start = new Date;
  yield next;
  // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
  // (6) 返回 this.body
});
// logger
app.use(function *(next){
  // (2) 进入 logger 中间件
  var start = new Date;
  yield next;
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});
// response
app.use(function *(){
  // (3) 进入 response 中间件，没有捕获到下一个符合条件的中间件，传递到 upstream
  this.body = 'Hello World';
});
app.listen(3000);
```

**1.4 中间件**

koa-router,trie-router,route, basic-auth, etag, compose, ...

[back to top](#top)

<h3 id="Koa-Router">2. Koa-Router中间件</h3>

```shell
npm install koa-router                      #if it is koa1.x
npm install koa-router[@next](/user/next)   #if it is Koa2.0
```

```javascript
/*简单样例*/
const Koa = require('koa');
const koaRouter = require('koa-router');
const app = new Koa();   //创建一个Koa对象表示web app本身
const router = koaRouter();
// 对于任何请求，app将调用该异步函数处理请求
app.use(router['routes']());
// add url-route
router.get('/index', function (ctx, next) {
	ctx.body = 'Hello Koa2.0!';
});
// 在端口3000监听
app.listen(3000, ()=>console.log('Koa start at 3000...'));
/*流处理形式*/
async function indexStep1(ctx, next) {
		//逻辑处理第一部分
		await next();
}
async function indexStep2(ctx, next) {
		//逻辑处理第二部分
		await next();
}
async function indexStep3(ctx, next) {
		//逻辑处理第三部分
		await ctx.render('index');
}
router.get('/index', indexStep1, indexStep2, indexStep3);
```

**2.1 基本用法**

```javascript
var app = require('koa')();
var router = require('koa-router')();
router.get('/', function *(next) {...});
app.use(router.routes())
   .use(router.allowedMethods());
```

**2.2 router.get|put|post|patch|delete**

```javascript
router
  .get('/', function *(next) {
    this.body = 'Hello World!';
  })
  .post('/users', function *(next) {
    // ...
  })
  .put('/users/:id', function *(next) {
    // ...
  })
  .del('/users/:id', function *(next) {
    // ...
  });
```

**2.3 多个中间件例子**

```javascript
router.get(
  '/users/:id',
  function *(next) {
    this.user = yield User.findOne(this.params.id);
    yield next;
  },
  function *(next) {
    console.log(this.user);     // => { id: 17, name: "Alex" }
  }
);
```

**2.4 嵌套路径**

```javascript
var forums = new Router();
var posts = new Router();
posts.get('/', function *(next) {...});
posts.get('/:pid', function *(next) {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());
```

**2.5 路由前缀**

```javascript
var router = new Router({
  prefix: '/users'
});
router.get('/', ...); // responds to "/users"
router.get('/:id', ...); // responds to "/users/:id"
```

**2.6 重定向**

```javascript
router.redirect('/login', 'sign-in');
//or
router.all('/login', function *() {
  this.redirect('/sign-in');
  this.status = 301;
});
```

[back to top](#top)

<h3 id="搭建api服务器">3. 搭建api服务器</h3>

```
├── app
│   ├──  controller\              #控制器
│   │    └──   userController.js
│   ├──  dao\                     #数据获取: 通过请求传入参数来获取user数据
│   │    └──   userDao.js 
│   ├──  public\
│   ├──  service\                 #数据处理: 从*Dao.js获取到的数据返回给Controller
│   │    └──   userService.js
│   ├──  utils\                   #数据库操作
│   │    └──   mysqlUtil.js
│   └──  router2controller.js     #路由器文件
├── config
│   ├──  config.default.js
│   ├──  config.local.js
│   └──  plugin.js
├── app.js                         #启动入口文件
└── package.json
```

```javascript
//app.js: 启动入口文件
const Koa = require('koa');
const app = new Koa();
const router2controller = require('./app/router2controller.js');
const config = require('./config/config.local.js');
//start接收到的xml数据请求单独解析存储
const xmlParser = require('koa-xml-body');
app.use(xmlParser()).use((ctx,next) => {
    ctx.data = ctx.request.body;
    return next();
});
app.use(router2controller());
app.listen(config.port);
console.log("Server started and listen on port " + crouter
  .get('/', async (ctx,next) => {
    this.body = 'Hello World!';
  })
  .post('/users', async (ctx,next) => {
    //TODO
  })
  .put('/users/:id', async (ctx,next) => {
    //TODO
  })
  .del('/users/:id', async (ctx,next) => {
    //TODO
  });onfig.port);
//router2controller.js: 路由器文件, koa-router
router
  .get('/', async (ctx,next) => {
    this.body = 'Hello World!';
  })
  .post('/users', async (ctx,next) => {
    //TODO
  })
  .put('/users/:id', async (ctx,next) => {
    //TODO
  })
  .del('/users/:id', async (ctx,next) => {
    //TODO
  });
```

[back to top](#top)

> References

- https://github.com/alexmingoia/koa-router
- https://github.com/koajs/koa/blob/HEAD/docs/guide.md
- [基于 Node 的下一代 Web 开发框架--koa](http://www.jianshu.com/p/01796348328a)
- [KOA 学习（一）](http://www.cnblogs.com/myzy/p/6510113.html)
- [解析Koa-Router，迈入Web次时代第一步（上）](http://cnodejs.org/topic/578a19866d3f2b2014113edd)
- [使用Koa2搭建web项目](http://blog.csdn.net/ererfei/article/details/68060551)