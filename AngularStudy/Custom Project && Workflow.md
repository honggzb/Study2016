## [Custom Project && Workflow](#top)

- [1. Dependencies and Typings](#Dependencies-Typings)
- [2. Gulp](#Gulp)
- [3. Linting with official styleguide](#Linting)
- [4. bundling and Minification](#bundling)
- [5. Adding Third party packages](#packages)

<h3 id="Dependencies-Typings介绍">1. Dependencies and Typings</h3>

1) generate original package.json: `npm init`

2) copy denpendencies to package.json or use angular CLI to create new project

```json
"dependencies": {
  "@angular/common": "^2.4.0",
  "@angular/compiler": "^2.4.0",
  "@angular/core": "^2.4.0",
  "@angular/forms": "^2.4.0",
  "@angular/http": "^2.4.0",
  "@angular/platform-browser": "^2.4.0",
  "@angular/platform-browser-dynamic": "^2.4.0",
  "@angular/router": "^3.4.0",
  "core-js": "^2.4.1",
  "rxjs": "^5.1.0",
  "zone.js": "^0.7.6"
  },
```

and install them, lite-server and denpendencies

```
npm install --save-dev lite-server
npm install --save-dev concurrently codelyzer tslint del gulp gulp-if gulp-sourcemaps gulp-typescript systemjs-builder typings yargs
```

3) modify package.json

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "postinstall": "typings install",
    "typings": "typings",
    "lite": "lite-server",
    "build:vendor": "gulp vendor",
    "build:dev": "gulp clean && gulp vendor && gulp build",
    "build:dev.watch": "gulp clean && gulp vendor && gulp",
    "build:production": "gulp clean && gulp vendor && gulp build --production && node systemjs.builder.js"
  },
```

 create `typings.json` file in root directory

```json
 {
   "globalDependencies": {
     "es6-shim": "registry:dt/es6-shim#0.31.2+20160317120654",
     "jasmine": "registry:dt/jasmine#2.2.0+20160412134438",
     "node": "registry:dt/node#6.0.0+20160613154055"
   }
 }
```

and run `npm run typings install`, and `npm install` again

create `tsconfig.json` file in root directory 

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  "files": [
    "./src/app/main.ts",
    "typings.d.ts"
  ],
  "atom": {
    "rewriteTsconfig": true
  }
}
```

4) create src folder and app folder (the structure is difference if using Angular CLI)

```
├── src
│    ├── app
│    │   ├── otherModule1
│    │   │   ├── other1.component.ts
│    │   │   └── other1.component.html
│    │   ├── otherModule2
│    │   │   ├── other2.component.ts
│    │   │   └── other2.component.html
│    │   ├── app.component.ts
│    │   ├── app.component.html
│    │   └── main.ts
│    ├── systemjs.config.js     --SystemJS配置文件, 如用Angular CLI则没有该文件
│    └── index.html
├── package.json           --管理需要依赖的脚本文件
├── tsconfig.json          --TypeScript编译配置文件
├── typings.json           --识别TypeScripte文件
├── systemjs.builder.js    --
├── gulpfile.js            --gulp配置文件
├── bs-config.js            --lite-server配置文件, 设置lite-server运行的base directory
```

```javascript
//bs-config.js: app load from dist, but npm run lite in package.json is in project root folder 
module.exports = {
  server: {
      baseDir: "./dist"
  }
};
```

[back to top](#top)

<h3 id="Gulp">2. Gulp</h3>

create gulpfile.js in root directory

```javascript
var gulp = require('gulp');
var gulpif = require('gulp-if');
var args = require('yargs').argv;

var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var del = require('del');

var src = 'src/';
var dist = 'dist/';

var tsconfig = typescript.createProject('tsconfig.json');

gulp.task('build-ts', function () {
    return gulp.src(src + 'app/**/*.ts')
        .pipe(gulpif(!args.production, sourcemaps.init()))
        .pipe(typescript(tsconfig))
        .pipe(gulpif(!args.production, sourcemaps.write()))
        .pipe(gulp.dest(dist + 'app'));
});

gulp.task('build-copy', function () {
    gulp.src([src + 'app/**/*.html', src + 'app/**/*.htm', src + 'app/**/*.css'])
        .pipe(gulp.dest(dist + 'app'));
    gulp.src([src + 'index.html'])
        .pipe(gulp.dest(dist));
    return gulp.src([src + 'systemjs.config.js'])
        .pipe(gulp.dest(dist));
});

gulp.task('clean', function() {  //clean dist directory in devlopment environment
   del([dist + '/**/*.html', dist + '/**/*.htm', dist + '/**/*.css'], dist + 'app');
});

gulp.task('vendor', function() {
    del([dist + '/vendor/**/*']);    //clean folder firstly
    gulp.src(['node_modules/@angular/**'])
        .pipe(gulp.dest(dist + 'vendor/@angular'));
    //ES6 Shim
    gulp.src('node_modules/es6-shim/**')
        .pipe(gulp.dest(dist + '/vendor/es6-shim/'));
    //reflect metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(dist + '/vendor/reflect-metadata/'));
    //rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(dist + '/vendor/rxjs/'));
    //systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(dist + '/vendor/systemjs/'));
    // ng2-bootstrap
    gulp.src('node_modules/ng2-bootstrap/**')
        .pipe(gulp.dest(dist + '/vendor/ng2-bootstrap/'));
    // moment
    gulp.src('node_modules/moment/**')
        .pipe(gulp.dest(dist + '/vendor/moment/'));
    //zonejs
    return gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(dist + '/vendor/zone.js/'));
});

gulp.task('watch', function() {
   gulp.watch(src + '**/*.ts', ['build-ts']);
   gulp.watch(src + '**/*.{html,htm,css}', ['build-copy']);
});
gulp.task('build', ['build-ts', 'build-copy']);
gulp.task('default', ['build', 'watch']);
```

create `systemjs.config.js` in root directory

```javascript
var map = {
    'app': 'app',
    'rxjs': 'vendor/rxjs',
    '@angular': 'vendor/@angular',
    'ng2-bootstrap': 'vendor/ng2-bootstrap',
    'moment': 'vendor/moment/moment.js'
};
var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'ng2-bootstrap': { defaultExtension: 'js' }
};
var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/forms',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/testing',
    '@angular/upgrade'
];
packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});
var config = {
    map: map,
    packages: packages
};
System.config(config);
```

[back to top](#top)


<h3 id="Linting">3. [Linting with official styleguide](https://www.npmjs.com/package/codelyzer)</h3>

create the following `tslint.json` file where your root directory is:

```json
{
  "rulesDirectory": [
    "node_modules/codelyzer"
  ],
  "rules":{
    "directive-selector": [true, "attribute", "sg", "camelCase"],
    "component-selector": [true, "element", "sg", "kebab-case"],
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-host-property-decorator": true,
    "no-attribute-parameter-decorator": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "no-forward-ref": true,
    "use-life-cycle-interface": true,
    "use-pipe-transform-interface": true,
    "pipe-naming": [true, "camelCase", "sg"],
    "component-class-suffix": true,
    "directive-class-suffix": true,
    "templates-use-public": true,
    "no-access-missing-member": true,
    "invoke-injectable": true
  }
}
```

[back to top](#top)

<h3 id="bundling">4. bundling and Minification</h3>

create the following `systemjs.builder.js` file where your root directory is:

```javascript
var path = require('path');
var Builder = require('systemjs-builder');
var del = require('del');

var builder = new Builder('dist', 'src/systemjs.config.js');

builder.bundle('app/main.js', './dist/app/main.js', { minify: true, encodeNames: false })
    .then(function() {
        del(['./dist/app/**/*.js', '!./dist/app/main.js']).then(function(paths) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    })
    .catch(function(err) {
        console.log('Build error!');
        console.log(err);
    });
```

[back to top](#top)

<h3 id="packages">5. Adding Third party packages</h3>

https://github.com/valor-software/ng2-bootstrap

`npm install --save ng2-bootstrap`

> Reference

- [Reactive Extensions介绍](http://www.cnblogs.com/shanyou/p/3233894.html)


[back to top](#top)
