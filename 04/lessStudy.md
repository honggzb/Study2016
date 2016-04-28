## 1. 注释

```less
/*我是被编译的*/
//不会被编译
```

## 2. 变量

```less
//使用@
@test_width: 300px;
.box{ width: @test_width;}
```

## 3. 混合mixin

3.1 不带参数

```less
.box{
  width: @test_width;
  .border; 
}
.border{ border:5px solid pink;}
```

相当于

```less
.box {
  width: 300px;
  border: 5px solid pink;
}
.border {
  border: 5px solid pink;
}
```

3.2 带参数

```less
//混合不带默认值
.box{
  width: @test_width;
  .border_02(10px); 
}
.border_02(@border_width){ border:@border_width solid pink;}
//混合带默认值
.box{
  width: @test_width;
  .border_02(); 
}
.border_02(@border_width:2px){ border:@border_width solid pink;}
```

## 4. 匹配模式 - 相当于if

```less
.triangle(top,@w:5px,@c:red){
  border-width: @w;
  border-color: transparent transparent @c transparent;
  border-style: solid;
}
.triangle(bottom,@w:5px,@c:red){
  border-width: @w;
  border-color:@c transparent transparent transparent;
  border-style: solid;
}
.triangle(@_,@w:5px,@c:red){ //note: @w:5px,@c:red不能省略
  width: 0; height: 0; 
  overflow: hidden;   //ie6 最小高度问题
}
.sanjiao {
  .triangle(top,10px);
}
```

## 5.运算

## 6.嵌套规则

- &(代表上一层选择器)对尾类使用： hover或focus
- 对连接的使用： &-item

```less
.list{
  width: 600px; padding: 0;margin: 30px auto; list-style: none;
  li { height: 30px; background-color: pink; margin-bottom: 5px; }
  a{
    float: left;
    &:hover{ color: red;}
  }
}
```

## 7. @arguments变量- @arguments包含了所有传递进来的参数

```less
.border_arg(@w:30px,@c:red,@xx:solid){
  border:@arguments;
}
.test_argument{ .border_arg; }
```

## 8. 避免编译(~'')- 用着calc和filter

```less
.test_02{ width: ~'calc(300px-30px)'; }
```
