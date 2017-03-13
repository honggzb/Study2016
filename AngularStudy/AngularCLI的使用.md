[top](#top)

- [1. setup by using angular-cli](#setup-by-using-angular-cli)
  - [1.1 Updating Angular CLI](#Updating-Angular-CLI)
  - [1.2 Proxy To Backend](#Proxy-To-Backend)
  - [1.3 Deploying the app via GitHub Pages](#Deploying-the-app-via-GitHub Pages)
  - [1.4 Library Installation](#Library-Installation)
- [2. project struture the Angular CLI setup](#project-struture)

<h3 id="setup-by-using-angular-cli">1. setup by using [angular-cli](https://cli.angular.io/)</h3>

```shell
npm install -g angular-cli
ng new PROJECT_NAME
cd PROJECT_NAME
ng serve    #lite-server
# configure the default HTTP port and the one used by the LiveReload server
ng serve --host 0.0.0.0 --port 4201 --live-reload-port 49153
#1. Generating Components, Directives, Pipes and Services
ng generate component my-new-component
ng g component my-new-component # using the alias
ng destroy my-new-component    #delete component, class ...
#2. creating a build - angular-cli.json
ng build   #generate build artifacts will be stored in the dist/ directory.
"environments": {
  "source": "environments/environment.ts",
  "dev": "environments/environment.ts",
  "prod": "environments/environment.prod.ts"
}
ng build --target=production --environment=prod
ng build --prod --env=prod
ng build --prod
# and so are these
ng build --target=development --environment=dev
ng build --dev --e=dev
ng build --dev
ng build    #default to dev
#3 running unit tests
ng test    #executed via Karma, and it will automatically watch your files for changes.
ng test --watch=false  #tests a single time
ng test --single-run   #tests a single time, 同上
ng e2e  #Running end-to-end tests, run via Protractor.
#more commands
ng get   #Gets values for project
ng set   #Sets values for project
ng lint     #Run codelyzer to analyze code
ng format 
ng doc
ng version    #Get the version of the CLI
```

**Generate Parts of Your Application**

Scaffold|Usage|short usage
---|---|---
Component|	ng g component my-new-component|ng g c my-new-component
Directive|	ng g directive my-new-directive|ng g d my-new-directive
Pipe|	ng g pipe my-new-pipe|ng g p my-new-pipe
Service|	ng g service my-new-service|ng g s my-new-service
Class|	ng g class my-new-class|ng g cl my-new-class
Guard|	ng g guard my-new-guard|
Interface|	ng g interface my-new-interface|ng g i my-new-interface
Enum|	ng g enum my-new-enum|ng g e my-new-enum
Module|	ng g module my-module|ng g m my-module

options|function
---|---
--flat|Don't create the code in it's own directory. Just add all files to the current directory.
--route=<route>|Specify the parent route. Only used for generating components and routes.
--skip-router-generation|Don't create the route config. Only used for generating routes.
--default|The generated route should be a default route.
--lazy|Specify if route is lazy. default true

**create an component that has no own directory, no seperate html file and style file**

```shell
ng g c componentName --flat --inline-template --inline-styles
ng g c componentName --flat -it -is   #简写
``` 

**Initialize a New Application** - already have a folder that you've started working in

`ng init scotchy-scotch`

options|alias|function
---|---|---
--dry-run|d|Only output the files created and operations performed. It doesn't actually create the project.
--verbose|v|Show more information
--skip-npm|none |Don't run any npm commands like installing dependencies
--name|none |Name the new project you are creating

**`NG NEW`** OPTIONS

options|alias|function
---|---|---
--dry-run|d|Only output the files created and operations performed. It doesn't actually create the project.
--verbose| v|Show more information
--skip-npm|none |Don't run any npm commands like installing dependencies
--skip-git|none |Don't create a new git repo for this project
--directory|none |Specify the directory you want to create this project in

[back to top](#top)

<h4 id="Updating-Angular-CLI">1.1 Updating Angular CLI</h4>

```
npm uninstall -g angular-cli
npm uninstall --save-dev angular-cli
//global package:
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest
//Local project package:
rm -rf node_modules dist # use rmdir /S/Q node_modules dist in Windows Command Prompt; use rm -r -fo node_modules,dist in Windows PowerShell
npm install --save-dev @angular/cli@latest
npm install
```

[back to top](#top)

<h4 id="Proxy-To-Backend">1.2 Proxy To Backend</h4>

- create a `proxy.conf.json` file

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

- edit the `package.json` file:  `"start": "ng serve --proxy-config proxy.conf.json",`

[back to top](#top)

<h4 id="Deploying-the-app-via-GitHub Pages">1.3 Deploying the app via GitHub Pages</h4>

`ng github-pages:deploy --message "Optional commit message"`

<h4 id="Library-Installation">1.4 Library Installation</h4>

- 3rd Party Library Installation 

```shell
#1) the library does not include typings
npm install d3 --save
npm install @types/d3 --save-dev
#2) the library doesn't have typings available at @types/
# create a typings.d.ts file in your src/ folder
# in src/typings.d.ts, add the following code
declare module 'typeless-package';
# in the component or file that uses the library, add the following code
import * as typelessPackage from 'typeless-package';
typelessPackage.method();
```

- Global Library Installation

```shell
#install bootstrap 4
npm install bootstrap@next
#add the needed script files to apps[0].scripts in angular-cli.json file
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/tether/dist/js/tether.js",
  "../node_modules/bootstrap/dist/js/bootstrap.js"
],
#add the Bootstrap CSS to the apps[0].styles array
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "styles.css"
],
# Restart ng serve
```

-- [how-to-add-bootstrap-to-an-angular-cli-project](http://stackoverflow.com/questions/37649164/how-to-add-bootstrap-to-an-angular-cli-project)

[back to top](#top)

<h3 id="project-struture">2. project struture the Angular CLI setup</h3>

```
// configuration files
|- config/
|----- environment.dev.ts
|----- environment.js
|----- environment.prod.ts
|----- karma-test-shim.js
|----- karma.conf.js
|----- protractor.conf.js

// end-to-end-tests
|- e2e/
|----- app.e2e.ts
|----- app.po.ts
|----- tsconfig.json
|----- typings.d.ts

// npm dependencies
|- node_modules/

// public facing app. built things go here
|- public/

// where most of the work will be done
|- src/
|----- app/
            |----- shared/
                        |----- index.ts
            |----- environment.ts
            |----- index.ts

            // our first generated component
            |----- scotchy-scotch.component.css|html|spec.ts|ts
|----- favicon.ico
|----- icon.png
|----- index.html
|----- main.ts
|----- manifest.webapp
|----- system-config.ts
|----- tsconfig.json
|----- typings.d.ts

// overall configuration
|- typings/
|- .clang-format
|- .editorconfig
|- .gitignore
|- angular-cli-build.js
|- angular-cli.json
|- package.json
|- tslint.json
|- typings.json
```


- https://github.com/angular/angular-cli
