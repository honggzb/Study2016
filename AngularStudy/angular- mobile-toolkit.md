[angular- mobile-toolkit](#top)  -- out of date

- [1. Create a Progressive Web App with Angular CLI](#create)
- [2. Make the App Installable with Web App Manifest](#make)
- [3. Add an app shell component to the App](#add-shell)
- [4. Add basic offline capabilities with Service Worker](#Service)

<h3 id="create">1. Create a Progressive Web App with Angular CLI</h3>

```shell
npm install -g angular-cli
ng new hello-mobile --mobile
cd hello-mobile
ng serve
```

**--mobile**

- A Web Application Manifest to give browsers information to properly install your app to the home screen
- A build step to generate an App Shell from your app's root component
- A Service Worker script to automatically cache your app for fast loading, with or without an internet connection
  - Note: the Service Worker is only installed in production mode, i.e. via ng serve --prod or ng build --prod

[back to top](#top)

<h3 id="make">2. Make the App Installable with Web App Manifest</h3>



[back to top](#top)

<h3 id="add-shell">3. Add an app shell component to the App</h3>



[back to top](#top)

<h3 id="Service">4. Add basic offline capabilities with Service Worker</h3>



[back to top](#top)

<h4 id="chaches-polyfill">1.2 chaches polyfill+HTTPS的支持 - 写码之前</h4>


[back to top](#top)

- https://mobile.angular.io/
- https://github.com/angular/mobile-toolkit
- 
