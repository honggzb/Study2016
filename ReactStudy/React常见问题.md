[React常见问题](#top)

- [1. bind this](#bind-this)

<h3 id="bind-this">1. bind this</h3>

this指向的是全局对象window而报错问题(http://blog.csdn.net/u010977147/article/details/53420407)

```javascript
//解决办法1: 使用Function.prototype.bind()
<Button type="primary" onClick={this.onSearch.bind(this)}>搜索</Button>
//解决办法2： 在构造函数中bind this
class Search extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }
    render(){
        return <div>
            <Form direction="hoz" labelAlign="left">
              <Button type="primary" onClick={this.onSearch}>搜索</Button>
            </Form>
        </div>
    }
}
//解决办法3： 使用箭头函数
<Button type="primary" onClick={(...args)=>{
                        this.onSearch( ...args)
                    }}>搜索</Button>
//解决办法4： ES7函数绑定语法， 使用 :: 绑定操作符
<Button type="primary" onClick={::this.onSearch}>搜索</Button>
```

某些场景下，我们需要传递额外的参数，比如列表中删除操作，需要传id。常用的方案是

```javascript
// Function.prototype.bind()
<Item onClick={this.doDelete.bind(this, id)}>删除</Item>
// 箭头函数
<Item onClick={(...args)=>{
    this.doDelete(id, ...args)
}}>删除</Item>
```

[back to top](#top)

> Reference

- [ React.js学习资源](http://blog.csdn.net/sinat_17775997/article/details/70144239)
