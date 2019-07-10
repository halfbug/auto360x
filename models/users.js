const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    avatar: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
    },
    roles: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    geo_location: {
        type: String
    },
    website: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    company_logo: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    }
})
  
module.exports = Users = mongoose.model('Users', UserSchema);