##passport.js Studing Notes

- http://passportjs.org/
- http://github.com/jaredhanson/passport
- https://www.npmjs.org/package/passport

###1. 概述

**1.1 策略（Strategy）**

passport模块本身不能做认证，所有的认证方法都以策略模式封装为插件，需要某种认证时将其添加到package.json即可。

策略模式是一种设计模式，它将算法和对象分离开来，通过加载不同的算法来实现不同的行为，适用于相关类的成员相同但行为不同的场景，比如在passport中，认证所需的字段都是用户名、邮箱、密码等，但认证方法是不同的。关于策略模式，本文不详细展开，想了解的推荐阅读[Javascript中的策略模式](http://www.oschina.net/translate/strategy-design-pattern-in-javascript)，或者[更广泛意义上的策略模式](http://blog.csdn.net/hguisu/article/details/7558249)。

依据策略模式，passport支持了众多的验证方案，包括Basic、Digest、OAuth（1.0，和2.0的三种实现）、Bearer等。

###2. 依赖和安装

**具体的依赖有：**

- Express：web框架。或其他支持的框架
- Connect：中间件框架
- cookie-parser：Connect的cookie解析中间件
- express-session：Connect的session解析中间件，依赖于cookie-parser
- express-flash：express的消息提示中间件，可选，但一般情况下都需要装

**安装和配置**

最少需要安装一个passport策略来使用它，一般而言本地验证策略passport-local是必装的。

```
npm install passport --save
npm install passport-local  --save
```

安装完成后需要配置中间件，一般的顺序如下：

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');
...
app.use(cookieParser());
app.use(session({...}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
```

###3. 基本用法

####3.1 local本地验证

本地验证默认使用`username`和`password`来进行验证

- **配置策略**

```javascript
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
  }
));
```

- **验证回调**

passport本身不处理验证，验证方法在策略配置的回调函数里由用户自行设置，它又称为验证回调。验证回调需要返回验证结果，这是由done()来完成的。
在passport.use()里面，done()有三种用法：

1. 当发生系统级异常时，返回`done(err)`，这里是数据库查询出错，一般用next(err)，但这里用done(err)，两者的效果相同，都是返回error信息；
2. 当验证不通过时，返回`done(null, false, message)`，这里的message是可选的，可通过express-flash调用；
3. 当验证通过时，返回`done(null, user)`。

**密码验证**

passport不提供密码验证，而是需要用户自定义。一般对密码进行哈希和盐化的Nodejs模块是`bcrypt`，它提供一个`compare`方法来验证密码

- **session序列化与反序列化**

验证用户提交的凭证是否正确，是与session中储存的对象进行对比，所以涉及到从session中存取数据，需要做session对象序列化与反序列化。

```javascript
//将user.id序列化到session中，即sessionID，同时它将作为凭证存储在用户cookie中
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
//从session反序列化，参数为用户提交的sessionID，若存在则从数据库中查询user并存储与req.user中
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

> 这段代码的顺序可以放在passport.use()的前面或后面，但需要在app.configure()之前

- **Authenticate验证**

```javascript
app.post('/login',
  passport.authenticate('local',{ 
     successRedirect: '/',
     failureRedirect: '/login',
     failureFlash: true
  }),
  function(req, res) {
    // 验证成功则调用此回调函数
    res.redirect('/users/' + req.user.username);
  });
```

authenticate()方法有3个参数，第一是name，即验证策略的名称，第二个是options，包括下列属性：

- session：`Boolean`。设置是否需要session，默认为true
- successRedirect：`String`。设置当验证成功时的跳转链接
- failureRedirect：`String`。设置当验证失败时的跳转链接
- failureFlash：`Boolean or String`。设置为Boolean时，express-flash将调用use()里设置的message。设置为String时将直接调用这里的信息。
- successFlash：`Boolean or String`

第三个参数是callback。注意如果使用了callback，那么验证之后建立session和发出响应都应该由这个callback来做，passport中间件之后不应该再有其他中间件或callback。

```javascript
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
```

- **HTTP request操作**

注意passport扩展了HTTP request，添加了四种方法

- logIn(user, options, callback)：用login()也可以。作用是为登录用户初始化session。options可设置session为false，即不初始化session，默认为true。
- logOut()：别名为logout()。作用是登出用户，删除该用户session。不带参数。
- isAuthenticated()：不带参数。作用是测试该用户是否存在于session中（即是否已登录）。若存在返回true。事实上这个比登录验证要用的更多，毕竟session通常会保留一段时间，在此期间判断用户是否已登录用这个方法就行了。
- isUnauthenticated()：不带参数。和上面的作用相反。

####3.2 OAuth验证

`npm install passport-oauth`

**3.2.1 OAuth验证流程**

1. 为app去第三方服务商处申请标识和令牌appkey和secret
2. 在app里添加按钮或链接，将用户引导至服务商的授权页，用户在这里选择授权给app
3. 授权成功后跳转回你的app，同时还传递回access_token和一些用户资料

```javascript
var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: '123-456-789',
    clientSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));
```

路由

```javascript
app.get('/auth/provider', passport.authenticate('provider',{scope: 'email'}));
app.get('/auth/provider/callback', 
  passport.authenticate('provider', {
	successRedirect: '/', 
	failureRedirect: '/login' 
}));
```

###4. 进阶学习


> 推荐项目

- [Hackathon Starter](https://github.com/sahat/hackathon-starter)：学习OAuth验证最好的项目，实现了十几种的第三方网站和服务的OAuth验证，推荐学习。
- [nodeclub](https://github.com/cnodejs/nodeclub/)：实现Github OAuth验证。

> references

- [passport官方文档](http://passportjs.org/guide/)
- http://idlelife.org/
- [passport.js学习笔记](http://idlelife.org/archives/808)
- [选择适合的Node.js授权认证策略](http://blog.csdn.net/chszs/article/details/24928985)
- [Express结合Passport实现登陆认证](http://blog.fens.me/nodejs-express-passport/): 张丹博客，基本用法，有完整示例
- [Passport实现社交网络OAuth登陆](http://blog.fens.me/nodejs-oauth-passport/): 张丹博客，基本用法，有Github和LinkedIn示例
- [OAuth 2和passport框架](http://www.moye.me/2014/10/01/oauth-2-0%E5%92%8Cpassport/)：讲OAuth2.0原理和passport基本示例
