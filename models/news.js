const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create news
const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    post_date: {
      type: Date,
      required: true,
      default: Date.now  
  },
    status: {
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
      type: String,
      required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        required: true
    }
})
  
module.exports = News = mongoose.model('News', NewsSchema);