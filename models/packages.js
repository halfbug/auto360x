// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create package
const PackageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    description: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date,
        default: Date.now
    },
     
})

// // describe your schema    
// var schema = new Schema({
//     time: Date
//   }, {
//     toObject: { getters: true }
//   });
  
  // schema.formatted_time -> DD/MM/YYYY
  // PackageSchema.virtual('formatted_start_date').get(function() {
  //   var start_date = new Date(this.start_date);
  //   return ((start_date.getMonth() + 1) + '/' + start_date.getDate() + '/' +  start_date.getFullYear());
  // });

  // PackageSchema.virtual('formatted_end_date').get(function() {
  //   var end_date = new Date(this.end_date);
  //   return ((end_date.getMonth() + 1) + '/' + end_date.getDate() + '/' +  end_date.getFullYear());
  // });
  
module.exports = Package = mongoose.model('Package', PackageSchema);