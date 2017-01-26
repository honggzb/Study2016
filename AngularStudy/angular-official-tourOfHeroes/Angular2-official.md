###1. setup local environment

[Download the QuickStart seed](https://github.com/angular/quickstart/archive/master.zip)

```
git clone https://github.com/angular/quickstart.git quickstart
cd quickstart
npm install
npm start
```

###2. project architect

```
angular-tour-of-heroes
├── app
│   ├── app-routing.module.ts
│   ├── app.component.ts  -root component of what will become a tree of nested components as the application evolves 
│   ├── app.component.css
│   ├── app.module.ts     -the root module that tells Angular how to assemble the application
│   ├── dashboard.component.ts
│   ├── dashboard.component.css
│   ├── dashboard.component.html
│   ├── hero-detail.component.ts
│   ├── hero-detail.component.css
│   ├── hero-detail.component.html
│   ├── hero-search.component.html 
│   ├── hero-search.component.css
│   ├── hero-search.component.ts
│   ├── hero-search.service.ts
│   ├── hero.service.ts
│   ├── rxjs-extensions.ts
│   ├── hero.ts           - domain model
│   ├── heroes.component.ts
│   ├── heroes.component.css
│   ├── heroes.component.html
│   ├── main.ts           -Compiles the application with the JIT compiler and bootstraps the application to run in the browser
│   ├── in-memory-data.service.ts   - in-memory database API
│   └── mock-heroes.ts              - mocking const data
├── node_modules
├── index.html
├── styles.css
├── systemjs.config.js
├── tsconfig.json
└── package.json
```

