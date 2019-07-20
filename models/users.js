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
       
    },
    status: {
        type: String, // pending , active , blocked
        default: "pending"
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
        default: "Individual"
    },
    phone_number: {
        type: Number,
        
    },
    address: {
        type: String,
        
    },
    geo_location: {
        type: String
    },
    website: {
        type: String
    },
    description: {
        type: String,
        
    },
    company_logo: {
        type: String,
        
    },
    company_name: {
        type: String,
        
    },
    company_address: {
        type: String,
        
    },
    company_detail: {
        type: String,
    },
    company_phone:{
        type: String,
    },
    company_email:{
        type: String,
    }
})
  
module.exports = Users = mongoose.model('Users', UserSchema);