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
router.get('/:id?', (req,res) => {
    console.log(req.params)
    
    console.log("iniside server call")
    let query = {};
    if(req.params.id !== undefined)
    {
        console.log("inside if")
        query = { _id: req.params.id };
    }
    
    console.log(query)
    Vehicle.find(query, function (err, vehicle) {})
    .sort({ date : -1 })
    .then(vehicles => res.send(vehicles));
// res.send("this")
});

// @route POST api/vehicle
// @desc  Create A Post
// @access Public
router.post('/',(req,res) => {


// Simple validation
if(!req.body.make && !req.body.model && !req.body.price && !req.body.zipcode ) {
  return res.status(400).json({ msg: 'Please fill the required fields requied fields are make, model, price and zipcode' });
}
    
    console.log(req.body);
   const newVehicle = new Vehicles({

    ...req.body
    
   });

console.log( "sending... to mongo db....");
   newVehicle.save().then(vehicle => {
    res.json(vehicle);
    // listing detail update here
    
   } ).catch((err)=> res.status(400).json({ msg: "Please enter correct information"}));

});

// @route   DELETE api/vehicle/:id
// @desc    Delete A Vehicle
// @access  Public
router.delete('/:id', (req, res) => {
    Vehicle.findById(req.params.id)
      .then(vehicle => vehicle.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false, msg: "Vehicle not found!" }));
  });

// @route   UPDATE api/vehicle/:id
// @desc    Update A Vehicle
// @access  Public
router.put('/:id', (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const fieldsInModel = ['make', 'seller_type', 'license_plate', 'transmission', 'engine', 'milage_km', 'owner', 'model', 'price', 'package', 'zip', 'interior_color', 'exterior_color', 'is_active', 'style', 'posted_by', 'description', 'year', 'front_view', 'back_view', 'side_view', 'interior_view', 'condition', 'drivetype']
    const isUpdateAllowed = fieldsToUpdate.every((field) => fieldsInModel.includes(field))

    if(!isUpdateAllowed){
        return res.status(400).json({ msg: 'Invalid field!'})
    }
  
    Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((vehicle) => {
        if(!vehicle){
            throw Error("Vehicle not found!")
        }
        res.json(vehicle)
    })
    .catch(err => res.status(404).json({ success: false, msg: 'Please enter correct information' }));
  });

module.exports = router
