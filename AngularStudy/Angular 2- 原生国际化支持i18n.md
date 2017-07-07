[Angular 2 原生国际化支持](#top)

- [1. 添加“i18n”指令](#添加i18n指令)
- [2. 创建translation模板messages.xlf](#从模板抽取文本)
- [3. 准备部署Product](#添加语言支持)
- [4. 添加link转入不同语言](#加link转入不同语言)
- [5. i18n after ejection](#i18n-after-ejection)

在Angular 1.x 的版本里面，没有原生的国际化支持，可利用第三方库或者利用过滤器和指令实现国际化。而在Angular 2里面已经提供了原生的国际化支持

<h3 id="添加i18n指令">1. 添加“i18n”指令</h3>

- `ng new projectName`
- 利用“i18n”属性标记需要翻译的内容，标签里面的内容将被抽取和翻译。

```html
<h1 i18n="an introduction header for this sample">Hello i18n</h1>  
<p i18n="a paragraph explaining what this sample is">This is a sample of internationalization in Angular2.</p>  
<h2 i18n>Attribute sample</h2>  
<input placeholder="Your name" [(ngModel)]="name" i18n-placeholder="a placeholder for field collecting the user's name">  
<h2 i18n>Multiple Element Sample</h2>  
  <!--i18n:multiple element examples-->  
  <p>Element 1</p>  
  <p>Element 2</p>  
  <!--/i18n-->  
<h2 i18n>Meaning Sample</h2>  
<p i18n="user welcome|a message welcoming the user by name">Hello {{name}}</p>  
```

[back to top](#top)

<h3 id="从模板抽取文本">2. 创建translation模板messages.xlf</h3>

`ng xi18n --output-path src/locale`, 在src/locale目录会生成messages.xlf文件，如下

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="04119e98bf36709ffe3215f379db996a1a34e7ce" datatype="html">
        <source>Hello world!</source>
        <target/>
        <context-group purpose="location">
          <context context-type="sourcefile">C:/others/books/Angular2Study/angular-i18n/src/app/app.component.ts</context>
          <context context-type="linenumber">3</context>
        </context-group>
      </trans-unit>
    </body>
  </file>
</xliff>
```

复制该文件为`src/locale/messages.en.xlf`， `src/locale/messages.en.xlf`，并修改各个文件的target内容

```xml
<trans-unit id="04119e98bf36709ffe3215f379db996a1a34e7ce" datatype="html">
  <source>Salut la foule !</source>
  <target><target/>
```

运行： `ng serve --aot --i18n-file=src/locale/messages.fr.xlf --locale=fr --i18n-format=xlf`

在浏览器键入localhost:4200, 即可看到法语版的app

[back to top](#top)

<h3 id="添加语言支持">3. 准备部署Product</h3>

修改package.json的script

```json
"scripts": {
    "extract-i18n": "ng xi18n --output-path src/locale",
    "start-i18n":"ng serve --aot --i18n-file=src/locale/messages.fr.xlf --locale=fr --i18n-format=xlf",
    "build-i18n:fr":"ng build --output-path=dist/fr --aot -prod --bh /fr/ --i18n-file=src/locale/messages.fr.xlf --i18n-format=xlf --locale=fr",
    "build-i18n:cn":"ng build --output-path=dist/cn --aot -prod --bh /fr/ --i18n-file=src/locale/messages.cn.xlf --i18n-format=xlf --locale=cn",
    "build-i18n": "npm run build-i18n:en && npm run build-i18n:cn && npm run build-i18n:fr"
}
```

- `--bh` which permits to declare the base href at compile time from command line
- 预期键入base url（http://myapp.com/）可自动转入(redirect)不同的语言版本App(  have some links in the app so the user can navigate to another languages by clicking these links. The links will point to /en/, /es/ and /fr/)

Apache2 configuration

```
<VirtualHost *:80>
  ServerName www.myapp.com
  DocumentRoot /var/www
  <Directory "/var/www">
    RewriteEngine on
    RewriteBase /
    RewriteRule ^../index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule (..) $1/index.html [L]
    RewriteCond %{HTTP:Accept-Language} ^fr [NC]
    RewriteRule ^$ /fr/ [R]
    RewriteCond %{HTTP:Accept-Language} ^es [NC]
    RewriteRule ^$ /es/ [R]
    RewriteCond %{HTTP:Accept-Language} !^es [NC]
    RewriteCond %{HTTP:Accept-Language} !^fr [NC]
    RewriteRule ^$ /en/ [R]
  </Directory>
</VirtualHost>
```

[back to top](#top)

<h3 id="加link转入不同语言">4. 添加link转入不同语言</h3>

Angular comes in our help with a LOCALE_ID opaque token that can be injected and it gets the same value that you pass to the ng serve command with the --locale parameter. 

```javascript
// app.component.ts
import { Component, LOCALE_ID, Inject } from '@angular/core';   // 添加LOCALE_ID token
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages = [
    { code: 'en', label: 'English'},
    { code: 'es', label: 'Español'},
    { code: 'fr', label: 'Français'}
  ];
  constructor(@Inject(LOCALE_ID) protected localeId: string) {}
}
<!-- app.component.html -->
<h1 i18n>Hello World!</h1>
<template ngFor let-lang [ngForOf]="languages">
  <span *ngIf="lang.code !== localeId">
    <a href="/{{lang.code}}/">{{lang.label}}</a> </span>
  <span *ngIf="lang.code === localeId">{{lang.label}} </span>
</template>
```

[back to top](#top)

<h3 id="i18n-after-ejection">5. i18n after ejection</h3>

`ng eject --output-path=dist/en --aot -prod --bh /en/ --i18n-file=src/locale/messages.en.xlf  --i18n-format=xlf --locale=en`

- 该命令生成webpack.config.js，该文件 will be used to build your French version when you run the command `npm run build`
- 拷贝webpack.config.js，并重命名，最后得到`webpack.fr.config.js`, `webpack.cn.config.js`, 并修改

```
--- webpack.config.js
+++ webpack.fr.config.js
@@ -44,7 +44,7 @@
     ]
   },
   "output": {
-    "path": path.join(process.cwd(), "dist/en"),
+    "path": path.join(process.cwd(), "dist/fr"),
     "filename": "[name].[chunkhash:20].bundle.js",
     "chunkFilename": "[id].[chunkhash:20].chunk.js"
   },
@@ -220,7 +220,7 @@
     }
     }),
     new BaseHrefWebpackPlugin({
-      "baseHref": "/en/"
+      "baseHref": "/fr/"
     }),
     new CommonsChunkPlugin({
       "name": "inline",
@@ -283,9 +283,9 @@
     new AotPlugin({
       "tsConfigPath": "src/tsconfig.json",
       "mainPath": "main.ts",
-      "i18nFile": "src/i18n/messages.en.xlf",
+      "i18nFile": "src/i18n/messages.fr.xlf",
       "i18nFormat": "xlf",
-      "locale": "en",
+      "locale": "fr",
       "hostReplacementPaths": {
         "environments/environment.ts": "environments/environment.prod.ts"
       },
```

修改package.json

```json
"scripts": {
  "build": "webpack --config webpack.fr.config.js && webpack --config webpack.en.config.js && webpack --config webpack.cn.config.js"
  }
```

[back to top](#top)

- [Deploying an i18n Angular app with angular-cli](https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358)
- https://github.com/angular/angular-cli/wiki/stories-internationalization
- http://angular-translator.elol.fr/
- [Angular 2 原生国际化支持](http://blog.csdn.net/spring1208/article/details/57182543)
- https://github.com/feloy/angular-cli-i18n-sample
- Angular 1的i18n[How to add I18N for an angularJS app - Step by step - Hands-on](http://uidudes.blogspot.ca/2015/10/how-to-add-i18n-for-angularjs-app-step.html)
