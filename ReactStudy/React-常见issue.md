[React Bug](#top)

- [1. Backgroundimage is not working](#bind-this)

<h3 id="bind-this">1. Backgroundimage is not working</h3>

Wrap the backgroundImage value in quotation marks to make it a string

```javascript
render() {
    return (
        <div className="phase1" 
             <div className="phase1" style ={{backgroundImage:"url('https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300')"}}>
            <input id="search" 
                   type="text" 
                   placeholder={this.state.search} 
                   onChange={this.updateSearch.bind(this)}/>
            &nbsp; &nbsp;&nbsp; &nbsp;

            <Link className="button1" to="Form"> + </Link>
        </div>
       )
    }
 }
```
[back to top](#top)

> Reference

- [ React.js学习资源](http://blog.csdn.net/sinat_17775997/article/details/70144239)
