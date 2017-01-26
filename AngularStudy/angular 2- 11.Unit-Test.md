##11 Unit Testing

###11.1 Jasmine - Behavior Driven Development(BDD)

```javascript
function helloWorld() {
	return 'Hello world!';
}
describe('Hello world', () => {
	it('says hello', () => {
		expect(helloWorld()).toEqual('Hello world!');
	});
});
```

11.1.1 **[Built-in matchers](http://jasmine.github.io/edge/introduction.html#section-Included_Matchers)**

```javascript
expect(array).toContain(member);
expect(fn).toThrow(string);
expect(fn).toThrowError(string);
expect(instance).toBe(instance);
expect(mixed).toBeDefined();
expect(mixed).toBeFalsy();
expect(mixed).toBeNull();
expect(mixed).toBeTruthy();
expect(mixed).toBeUndefined();
expect(mixed).toEqual(mixed);
expect(mixed).toMatch(pattern);
expect(number).toBeCloseTo(number, decimalPlaces);
expect(number).toBeGreaterThan(number);
expect(number).toBeLessThan(number);
expect(number).toBeNaN();
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(number);
expect(spy).toHaveBeenCalledWith(...arguments);
```

11.1.2 **Setup and teardown**

setup|Function
---|---
beforeAll| This function is called once, before all the specs in describe test suite are run
afterAll|This function is called once after all the specs in a test suite are finished
beforeEach|This function is called before each test specification, it function, has been run
afterEach|This function is called after each test specification has been run

```javascript
describe('Hello world', () => {
	let expected = "";
	beforeEach(() => {
		expected = "Hello World";
	});
	afterEach(() => {
		expected = "";
	});
	it('says hello', () => {
		expect(helloWorld()).toEqual(expected);
	});
});
//disable test
xdescribe('Hello world', () => {    //These tests will not be run
//focused test 
fdescribe('Hello world', () => {   //Out of all the tests in all the tests suites and tests specs, these are the only ones that will be run
```

11.1.3 environment setup - The order of script tags is important.

```html
<link rel="stylesheet" href="jasmine.css">
<script src="jasmine.js"></script>
<script src="jasmine-html.js"></script>
<script src="boot.js"></script>
<script src="main.js"></script>
<script src="test.js"></script>
```

###11.2 Karma

- run Jasmine tests from the command line
- watch develpment files and re-run the tests automatically

###11.3 Angular CLI

Angular CLI creates stub test files to creating and running unit tests using Jasmine and Karma

`ng generate pipe My` will create 2 files

- my-pipe.ts
- my-pipe.spec.ts

###11.4 Testing with Mocks & Spies

- Mocking by overriding functions
- A Spy is a feature of Jasmine which lets you take an existing class, function, object

###11.5 Angular Test Bed

- Angular Test Bed: Angular hige lever testing framework, ATB lets us test parts of our code as if it is being run in the context of a real Angular app
- test the interaction of a directive or component with it’s template.
- test change detection.
- test and use Angulars DI framework,
- test using the NgModule configuration we use in our application.
- test user interaction via clicks & input fields

```javascript
import {TestBed, ComponentFixture} from '@angular/core/testing';   // import ATB DI
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";

describe('Component: Login', () => {
	
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;  //1) a wrapper for a component and it’s template
	let authService: AuthService;
	
	beforeEach(() => {
		// refine the test module by declaring the test component
		TestBed.configureTestingModule({   // configuration ATB- 
			declarations: [LoginComponent],
			providers: [AuthService]
		});
		fixture = TestBed.createComponent(LoginComponent);  //2) create component and test fixture
		component = fixture.componentInstance; //3) get test component from the fixture
		authService = TestBed.get(AuthService); //4) UserService provided to the TestBed, get(): to resolve dependencies using the TestBed injector
	});
	
	it('canLogin returns false when the user is not authenticated', () => {
		spyOn(authService, 'isAuthenticated').and.returnValue(false);
		expect(component.needsLogin()).toBeTruthy();
		expect(authService.isAuthenticated).toHaveBeenCalled();
	});
});
```

###11.6 Test Asynchronous functions

- Jasmine done function and spy callbacks
- Angular async and whenStable functions
- Angular fakeAsync and tick functions

###11.7 Testing Dependency Injection

- via TestBed
- via the inject function
- via the component injector

###11.8 Testing Components, Directives, Model Driven Form, Http and Jsonp, Routing
