var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required:"String is required"
  },
  
  pub_date: {
    type: String,
    trim: true,
    required:"String is required"

  },

  article_link: {
    type: String,
    trim: true,
    required:"String is required"

  }
  

});

var ArticleModel= mongoose.model('articles', articleSchema);
module.exports = ArticleModel;
