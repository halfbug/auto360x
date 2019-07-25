// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create message
const MessageSchema = new Schema({
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    message: {
      type: String,
      required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
})
  
module.exports = Message = mongoose.model('Message', MessageSchema);