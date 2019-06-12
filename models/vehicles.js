
// import mongoose from 'mongoose';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Create vehicles 

const VehiclesSchema = new Schema ({
make : {
    type : String,
    required : true

},
seller_type :{
    type : String,
    required: true
},
license_plate : {
    type : String,
    required: true
},
registration_year : {
    type : Date,
    default: Date.now
},
transmission : {
    type : String,
    required : true
},
engine : { type : String},
milage_km : {
    type : String,
},
owner: {
    type : String,
},
model : {
    type :  String,
},
price : {
    type : Number,
},
package: {
    type: String,
},
zip : {
    type : Number,
},


});

module.exports = Vehicles = mongoose.model('Vehicles', VehiclesSchema);