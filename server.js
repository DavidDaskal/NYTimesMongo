var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));



//Database configuration
// mongoose.connect('mongodb://localhost/nytimes');

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  
  mongoose.connect('mongodb://localhost/nytimes');
}

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var ArticleModel = require('./articleModel.js');

app.post('/submit', function(req, res) {

  console.log('go2mongo',req.body)

  var content = new ArticleModel(req.body);
  console.log('eta content',content);
 
  content.save(req.body, function(err, saved) {
    if (err) {
      console.log('error saving to mongo',err);
    } else {
      console.log('savedd data',saved);
      res.send(saved);
    }
  });

});

app.get('/all', function(req, res) {
 
  ArticleModel.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});




  
  





// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});







app.listen(3000, function() {
  console.log('App running on port 3000!');
});
