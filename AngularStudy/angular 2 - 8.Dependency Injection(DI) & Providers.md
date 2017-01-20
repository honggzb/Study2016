##8 Dependency Injection(DI) & Providers

![](http://i.imgur.com/XUfLhao.png)

- token: uniquely identifies
- Dependency:  the actual code want injected, 一个Dependence是某个对象被创建的类型。
- Provider  :  a map between a token and a list of dependancies
- Injector  :  a function which when passed a token returns a denpendency(or a list of dependancies)

###8.1 injector

```javascript
import { ReflectiveInjector} from '@angular/core';    //1) import injector class
class MandrillService {};                             //2) token: create service class
class SendGridService {};
let injector = ReflectiveInjector.resolveAndCreate([  //3) configure injector
  MandrillService,
  SendGridService
]);
let childInjector = injector.resolveAndCreate([MandrillService]);  //child injector
let emailService1 = injector.get(MandrillService);    //4) pass in a token, into injector and ask it to resolve to a dependency
emailService1.foo = "moo";
//Dependency caching: dependencies returned from injectors are cached. So multiple calls to the same injector for the same token will return the same instance
let emailService2 = injector.get(MandrillService);
let emailService3 = childInjector.get(MandrillService);
console.log(emailService1);
console.log(emailService1 == emailService2);   //true: dependency caching
console.log(emailService2.foo);     // moo: dependency caching
console.log(emailService1 == emailService3);   //false: child injector
```

###8.2 Provider

- provider property is the token and can either be a type , a string or an instance 
- providers can be configured with classes, values, aliases and factories

```javascript
//long term
class MandrillService {};
class SendGridService {};
let injector = ReflectiveInjector.resolveAndCreate([
		{ provide: EmailService, useClass: MandrillService },
		{ provide: SendGridService, useClass: SendGridService },
]);
let emailService = injector.get(EmailService);  // MandrillService{}
// 1) useExisting
class MandrillService {};
class SendGridService {};
class GenericEmailService {};
let injector = ReflectiveInjector.resolveAndCreate([
	{ provide: GenericEmailService, useClass: GenericEmailService },
	{ provide: MandrillService, useExisting: GenericEmailService },
	{ provide: SendGridService, useExisting: GenericEmailService }
]);
let emailService1 = injector.get(SendGridService);    // GenericEmailService{}
let emailService2 = injector.get(MandrillService);    // GenericEmailService{}
let emailService3 = injector.get(GenericEmailService); // GenericEmailService{}
// 2) useValue
let injector = ReflectiveInjector.resolveAndCreate([
	{ provide: "Config",
		useValue: {
			'APIKey': 'XYZ1234ABC',
			'APISecret': '555-123-111'
		}
	}
]);
let config = injector.get("Config");    // Object {APIKey: "XYZ1234ABC", APISecret: "555-123-111"}
// 3) Object.freeze, objects values can’t be changed, in effect it’s read-only.
let injector = ReflectiveInjector.resolveAndCreate([
	{ provide: "Config",
		useValue: Object.freeze({
			'APIKey': 'XYZ1234ABC',
			'APISecret': '555-123-111'
		})
	}
]);
// 4) useFactory
class MandrillService {};
class SendGridService {};
const isProd = true;
let injector = ReflectiveInjector.resolveAndCreate([
	{
		provide: "EmailService",
		useFactory: () => {
			if (isProd) {
				return new MandrillService();
			} else {
				return new SendGridService();
			}
		}
	},
]);
let emailService1 = injector.get("EmailService");   // MandrillService {}
```

###8.3 Tokens

- String Tokens:
- Type Tokens:
- OpaqueToken:  a token is via an instance of an OpaqueToken( String tokens can cause name clashes so we prefer to use OpaqueTokens instead.)

```javascript
// String Tokes
let injector = ReflectiveInjector.resolveAndCreate([
	{ provide: "EmailService", useClass: MandrillService }
]);
// Type Tokens
class EmailService {};
class MandrillService extends EmailService {};
let injector = ReflectiveInjector.resolveAndCreate([
	{ provide: EmailService, useClass: MandrillService }
]);
// OpaqueToken
import { OpaqueToken } from '@angular/core';
class MandrillService {};
let EmailService = new OpaqueToken("EmailService"); 
let injector = ReflectiveInjector.resolveAndCreate([
	{ provide: EmailService, useClass: MandrillService } 
]);
```

###8.4 Configuring Dependency Injection in Angular

- injector tree matched component tree stemming from the root NgModule down

![](http://i.imgur.com/mXP8wfq.png)

- providers vs viewProviders: 
	- providers
	- viewProviders: special providers that resolves dependencies only for this components view children an doesn't act as a parent injector for any content children
- `@Inject` & `@Injectable`: inject in inject
	- `@Injectable` for a whole class, `@Injectable` is actually a shortcut for having to decorate every parameter in  constructor with `@Inject`
	- do not need to use `@Injectable` if we are already using another decorator

```javascript
import {NgModule, Component, Injectable, Inject, Injectable} from '@angular/core';
//...
class OtherService {
  constructor() {};
}
// class SimpleService{
//   otherService: OtherService;
//   constructor(@Inject(OtherService) otherService: OtherService){   // 1) simpleService inject otherService by using @Inject
//     this.otherService = otherService;
//   };
// }
// 2) or-  simpleService inject otherService by using @Injectable
@Injectable()
class SimpleService{
  otherService: OtherService;
  constructor( otherService: OtherService){
    this.otherService = otherService;
  };
}
@Component({
  selector: 'simple',
  template: `<p>Simple is as simple does</p>`
})
class SimpleComponent {
  constructor(private simpleService: SimpleService) {   //component inject simpleService
  }
}
```

###8.5 NgModule.providers vs Component.providers vs Component.viewProviders

NgModule.providers|Component.providers|Component.viewProviders
---|---|---
providers on NgModel | providers on Components and Directives | viewProviders on Components

refer to [plunk-providers.zip](https://github.com/honggzb/Study2016/blob/master/AngularStudy/plunk-providers.zip)

