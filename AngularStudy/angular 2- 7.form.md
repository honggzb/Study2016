<h2 id="top">7. Form</h2>

- [7.1 Model driven Form](#Model-driven-Form)
- [7.2 Reactive Model Form](#Reactive-Model-Form)
- [7.3 Template Driven Form](#Template-Driven-Form)
- [7.4 Advanced Topics](#Advanced-Topics)
	- [7.4.1 Custom Form Validators](#Custom-Form-Validators)
	- [7.4.2 Configurable Custom Form Validators](#Configurable-Custom-Form-Validators)
	
**Template driven** | **Model driven**
---|---
Form is set up and configured in HTML code| Form is set up and configured programmatically in class body
Angular 2 "infers" FormGroup from HTML code(in template) |Angular 2 is instructed to use the created FormGroup and not infer it(in component class)
Form data is passed via ngSubmit()| Form(data) can be used throughout class body without passing it via ngSubmit()
use ngModel directive(two way data binding)|/
low logic, hard for end to end testing| strong logic on component
easy to setup and use, saving develpment time | harder to setup, scalability

[back to top](#top)

<h3 id="Model-driven-Form">7.1 Model driven Form</h3>

- create a form model on component by using instances of `FormGroup` and `FormControl`
- directives(link template(html form) to model): `formGroup, formControlName, formGroupName`
- to use previous directive:  import `ReactiveFormsModule`

```html
<!-- 1) import directives输入相应的模块 -->
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';   
@Component({
  selector: 'model-form',
  template: `
  <form novalidate [formGroup]="myform">   <!-- 2) [formGroup] link formGroup to myform  -->
    <fieldset formGroupName="name">        <!-- 2) formGroupName   -->
      <div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control" formControlName="firstName"> <!-- 2) formControlName  -->
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" class="form-control" formControlName="lastName"> <!-- 2) formControlName  -->
      </div>
    </fieldset>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" formControlName="email"><!-- 2) formControlName  -->
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" formControlName="password"><!-- 2) formControlName  -->
    </div>
  </form>
  `
})
class ModelFormComponent implements OnInit  {
  myform: FormGroup;             // 3) declare FormGroup model 声明整个form
  ngOnInit() {                   // 4) declare instance of model 声明各个form model
    this.myform = new FormGroup({   //define instance of FormGroup model
      name: new FormGroup({         //define instance of FormGroup model
        firstName: new FormControl('', Validators.required),  //define instance of FormControl model
        lastName: new FormControl('', Validators.required),   //define instance of FormControl model
      }),
      email: new FormControl('',[   //define instance of FormControl model
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
        ]),
      password: new FormControl('',[    //define instance of FormControl model
        Validators.required,
        Validators.minLength(8)
        ]),
      language: new FormControl()
    });
  }
}
```

- Form control state

```html
<pre>Dirty ? {{myform.controls.email.dirty}}</pre><!-- true when user change field -->
<pre>Pristine ? {{myform.controls.email.pristine}}</pre>
<pre>Touched? {{ myform.controls.email.touched }}</pre>
<pre>Untouched? {{ myform.controls.email.untouched }}</pre>
<pre>Valid? {{ myform.controls.email.valid }}</pre>
<pre>Invalid? {{ myform.controls.email.invalid }}</pre>
<!-- -->
<div class="form-group" [ngClass]="{
	'has-danger': myform.controls.email.invalid && (myform.controls.email.dirty || myform.controls.email.touched),
	'has-success': myform.controls.email.valid && (myform.controls.email.dirty || myform.controls.email.touched)}">
	<label>Email</label>
	<input type="email" class="form-control" formControlName="email" required>
	<div class="form-control-feedback" *ngIf="email.errors && (email.dirty || email.touched)">
		<p *ngIf="email.errors.required">Email is required</p>
		<p *ngIf="password.errors.pattern">The email address must contain at least the @
		character</p>
	</div>
</div>
<!-- -->
<fieldset formGroupName="name" [ngClass]="{
        'has-danger': myform.controls.name.controls.firstName.invalid && myform
        .controls.name.controls.firstName.dirty,
        'has-success': myform.controls.name.controls.firstName.valid && myform
        .controls.name.controls.firstName.dirty}"> 
      <div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control" formControlName="firstName">
			<!--   ...  -->
```

- Validation
	- Validators.required
	- Validators.pattern
	- Validators.minLength
	- Validators.maxLength
- submit + reset: ngSubmit directive

```html
<form (ngSubmit)="onSubmit()">
<!-- -->
	<button type="submit" class="btn btn-primary" >Submit</button>
</form>
```

```javascript
onSubmit() {
	if (this.myform.valid) {
		console.log("Form Submitted!");
		this.myform.reset();
	}
}
```

[back to top](#top)

<h3 id="Reactive-Model-Form">7.2 Reactive Model Form</h3>

- formControl directives
- FormGroup & FormControl observable
- debounceTime & distinctUntilChanged operators

<h3 id="Template-Driven-Form">7.3 Template Driven Form</h3>

- Template Drive Forms are Model Driven form but driven by directives in the template- still use models underneath
- use directives(`ngForm, ngModel, ngModelGroup`: `ngModule,FormsModule`) to create the Model
- two way data binding: `<input ... [(ngModel)]="email" >`, 相当于`<input ... [ngModel]="email"  (ngModelChange)="email = $event">`
- ngForm directive automatically attaches to <form> and creates a FormGroup
- ngModel directive(automatically create FormControls and lets us use two way data binding)
	- it create an instance of FormControl and  adds it to the parent FormGroup
	- it allows to perform two way data binding between a template input control and a variable on component
- use domain models to store form state

```html
import { FormsModule,  FormGroup,FormControl } from '@angular/forms';  //import directives
// Domain model
class Signup {
  constructor(public firstName: string = '',
              public lastName: string = '',
              public email: string = '',
              public password: string = '',
              public language: string = '') {
  }
}
@Component({
  selector: 'template-form',
  template: `
<form novalidate (ngSubmit)="onSubmit()" #f="ngForm">  <!-- 1) local reference variable related to directive ngForm -->
	<fieldset ngModelGroup="name">   <!-- 2) ngModelGroup directive -->
		<div class="form-group">
			<label>First Name</label>
			<input type="text" class="form-control" name="firstName" [(ngModel)]="model.firstName"  
			       #firstName="ngModel">  
			       <!-- 3) local reference variable(firstName) related to directive ngModel, model name is "firstName" -->
		</div>
		<div class="form-group">
			<label>Last Name</label>
			<input type="text" class="form-control" name="lastName"
			       [(ngModel)]="model.lastName" #lastName="ngModel">
			       <!-- 3) local reference variable(lastName) related to directive ngModel, model name is "lastName" -->
		</div>
	</fieldset>
</form>  
`
})
class TemplateFormComponent {
  model: Signup = new Signup();  // 4) Domain model
  @ViewChild('f') form: any;
  onSubmit() {
   // ...
  }
}
```

[back to top](#top)

<h3 id="Advanced-Topics">7.4 Advanced Topics</h3>

<h3 id="Custom-Form-Validators">7.4.1 Custom Form Validators</h3>

- Custom model form Validators
- Custom Template form Validators

```javascript
function emailDomainValidator(control: FormControl){
  let email = control.value;
  if(email && email.indexOf("@") != 1){
    let[_,domain] = email.split("@");
    if(domain !== "codecraft.tv"){
      return {
        emailDomain: { parseDomain: domain}
      }
    }
  }
  return null;
}
```

[back to top](#top)

<h3 id="Configurable-Custom-Form-Validators">7.4.2 Configurable Custom Form Validators - using factory or class</h3>

- Custom model form Validators: use a factory function which returns a validator function configured as we want
- Custom Template form Validators: create a validator class which re-using the same factory function as we used in model driven forms

```javascript
class CodeCraftValidators {
  static emailDomain(requiredDomain) {
    return function(control: FormControl){
      let email = control.value;
      if(email && email.indexOf("@") != 1){
        let[_,domain] = email.split("@");
        if(domain !== requiredDomain){
          return {
            emailDomain: { 
              parseDomain: domain,
              requiredDomain: requiredDomain  // default passed domain
            }
          }
        }
      }
      return null;
    }
  }
}
```

[back to top](#top)

