var express = require('express');
var path = require('path');
var bodyParser = require('bodyParser');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'client')));
//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencode({extended: true}));

app.listen(app.get('port'),function(){
  console.log('Server has started on Port: '+ app.get('port'));
})
