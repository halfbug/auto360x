const express = require ('express');
const router = express.Router();

//Vehicles Model
const Vehicle = require('../../models/vehicles.js');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('connecting to vehicle collection');
    next(); // make sure we go to the next routes and don't stop here
});

//@route Get api/vehicles
//@desc Get All Items
//@access  Public
router.get('/', (req,res) => {
    Vehicle.find()
    .sort({ date : -1 })
    .then(vehicles => res.json(vehicles));

});

// @route POST api/vehicle
// @desc  Create A Post
// @access Public
router.post('/',(req,res) => {
    console.log(req.body);
   const newVehicle = new Vehicles({

    ...req.body
    
   });

console.log( "sending... to mongo db....");
   newVehicle.save().then(vehicle => {
    res.json(vehicle);
    // listing detail update here
    
   } ).catch((err)=> res.json(err));

});


module.exports = router
