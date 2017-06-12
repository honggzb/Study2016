- [1. Decorators in Angular 2](#Decorators-in-Angular2)
- [2. Abstract classes](#Abstract-classes)

<h3 id="Decorators-in-Angular2">1. Decorators in Angular 2</h3>

Basically, decorators in Angular 2 apply metadata on classes leveraging the Reflect Metadata library. When Angular 2 will use the class, it will get this metadata to configure the expected behavior, for example in the case of a component

![](http://i.imgur.com/QpyV9re.png)

Angular 2 uses several entries for this metadata:

- annotations:       This corresponds to metadata set by decorators at the class level. It’s an array since you can apply several decorators at this level. For example, `@Component` and `@Routes`
- design:paramtypes: This corresponds to the types of constructor parameters. It only applies for TypeScript since with ES6, such parameters aren’t supported. With this language, you need to supply a static getter for the parameters property
- propMetadata:      This corresponds to metadata set by decorators at the class property level. It’s an object and each entry name is the property name. Each entry contains an array since it’s also possible to define several decorators on a property
- parameters:        This corresponds to metadata set by decorators at the constructor parameter level. It’s an array of arrays since it’s always possible to define several decorators on a parameter

![](http://i.imgur.com/krsR1PM.png)

![](http://i.imgur.com/C35b3tg.png)

![](http://i.imgur.com/VXx65ko.png)

[back to top](#top)

**to access metadata from the parent class**

```javascript
export function CustomComponent(annotation: any) {
  return function (target: Function) {
    var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    
    var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
    var parentParamTypes = Reflect.getMetadata('design:paramtypes', parentTarget);
    var parentPropMetadata = Reflect.getMetadata('propMetadata', parentTarget);
    var parentParameters = Reflect.getMetadata('parameters', parentTarget);
  };
}
```

**set this metadata on the child class**

```javascript
export function CustomComponent(annotation: any) {
  return function (target: Function) {
    var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
    var parentAnnotation = parentAnnotations[0];
    Object.keys(parentAnnotation).forEach(key => {
      if (isPresent(parentAnnotation[key])) {
        if (!isPresent(annotation[key])) {
          annotation[key] = parentAnnotation[key];
        }
      }
    });
    
    var metadata = new ComponentMetadata(annotation);
    Reflect.defineMetadata('annotations', [ metadata ], target);
  };
};
```

**the selector is overridden in the child component and inherits the template**

```javascript
@Component({
  selector: 'master',
  template: `
    <div>Test</div>
  `
})
export class AbstractComponent {
}

@CustomComponent({
  selector: 'sub'
})
export class SubComponent extends AbstractComponent {
}

@Component({
  selector: 'app',
  template: `
    <div>
      <div>
        <sub></sub>
      </div>
    </div>
  `,
  directives [ SubComponent ]
})
export class App {
}
```

<h3 id="Abstract-classes">2. Abstract classes</h3>

```javascript
@Injectable()
export abstract class ProjectService {  
  abstract all(): Observable<Array<User>>
}
@Injectable()
export class MockUserService extends ProjectService {  
  // Implementation here.
}
// then provide the following for the module
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [UserComponent],
  exports: [UserComponent],
  providers: [{ provide: UserService, useClass: MockUserService }]
})
//then inject the service into the component through the constructor
constructor(userService: UserService) {}  
```

- to print the metadata set by Angular 2 for both component and service: https://plnkr.co/edit/k6Ax1f2Awll8RYNngx7D?p=preview
- to implement the `@CustomComponent` decorator:https://plnkr.co/edit/xDXkpwjvaKPlzUmRXtZh?p=preview
- to mix dependency injection configuration and class inheritance with the `@CustomInjectable` decorator: https://plnkr.co/edit/7CKxauAHnEeBvluzwai4?p=preview

[back to top](#top)

> Reference

- [The great abstraction with Angular2](https://freshweb.io/the-great-abstraction-with-angular2/)
- [Angular 2, decorators and class inheritance](https://medium.com/@ttemplier/angular2-decorators-and-class-inheritance-905921dbd1b7)
- 
