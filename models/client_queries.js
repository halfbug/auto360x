// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create client_query
const ClientQueriesSchema = new Schema({
    request_type: {
        type: String,
        required: true
    },
    dealership_name: {
        type: String,
        required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
     
})
  
module.exports = ClientQueries = mongoose.model('ClientQueries', ClientQueriesSchema);