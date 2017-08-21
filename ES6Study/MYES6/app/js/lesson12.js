/*
* Class
 */
{
  class Parent {
    constructor(lastname="mukewang"){  //构造函数
      this.lastname = lastname;
    }
  }
  let v_parent = new Parent('v');
  console.log('构造函数和实例', v_parent);
}
//继承\继承传递参数
{
  class Parent {
    constructor(lastname="mukewang"){  //构造函数
      this.lastname = lastname;
    }
  }
  class Child extends Parent {
    constructor(lastname,firstname="li"){
      super(lastname);                 //继承父类的参数
      this.firstname = firstname;
    }
  }
  console.log('继承',new Child());                  //继承 Child {lastname: "mukewang", firstname: "li"}
  console.log('继承',new Child("hello","qian"));    //继承 Child {lastname: "hello", firstname: "qian"}
}
//getter,setter
{
  class Parent {
    constructor(name="mukewang") {
      this.name = name;
    }
    get longName(){   //注意，这里longName是属性而不是方法
      return 'mk'+this.name;
    }
    set longName(value){
      this.name = value;
    }
  }
  let v = new Parent();
  console.log('getter', v.longName);    //getter mkmukewang
  v.longName = "hello";
  console.log('setter', v.longName);    //setter mkhello
}
//静态方法, 静态属性
{
  class Parent {
    constructor(name="mukewang") {
      this.name = name;
    }
    static tell(){      //静态方法: 通过类去调用，而不是通过类的实例调用
      console.log("tell");
    }
  }
  Parent.type = 'test';  //静态属性type, 注意： ES6中无定义静态属性的关键字
  Parent.tell();         //tell
  console.log('静态属性', Parent.type);   //静态属性 test
}
