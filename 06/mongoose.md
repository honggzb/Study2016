
- Schema
- model
- Documents

### Schema

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number,
    createAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

blogSchema.pre('save',function(next){
  if(this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  }else{
    this.meta.updatedAt = Date.now();
  }
  next();
});

blogSchema.statics = {
  fetch: function (cb) {
    return this.find({}).sort('meta.updatedAt').exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({_id: id}).exec(cb);
  }
}
module.exports = blogSchema;
```

The permitted [SchemaTypes](http://mongoosejs.com/docs/schematypes.html)

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

### model - 编译模型，生成构造函数

To use schema definition, we need to convert it into a Model. To do so, we pass it into `mongoose.model(modelName, schema)`

```javascript
var mongoose = require('mongoose');
var blogSchema = require('../schemas/blog');

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
```

### Documents

Instances of Models are documents. Documents have many of their own built-in instance methods. 

```javascript

```

- schemas
- models


```javascript
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Blog = require('../models/blog');
var port = process.env.Port || 3000;
var app = express();

mongoose.connect('mongodb://localhost/travels');

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(express.bodyParser());

app.listen(port);
console.log('server started on port' + port);

app.get('/',function(req,res) {
  Blog.fetch(function(err,blogs){
    if(err){
      console.log(err);
    }
    res.render('index', {
      title: 'index',
      blogs: blog
    })
  });
});

app.get('blog/:id',function(req,res) {
  var id = req.params.id;
  Blog.findById(id, function(err,blog){
    res.render('detail', {
      
    })
  })
})
```
