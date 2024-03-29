const express = require ('express');
const router = express.Router();

//Package Model
const Package = require('../../models/packages');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//@route Get api/packages
//@desc Get All Packages
//@access  Public
router.get('/', (req,res) => {
    Package.find()
    .then(packages => res.json(packages))
    .catch(err => res.status(400).json({ msg: err }))
});

// @route POST api/packages
// @desc  Create A Package
// @access Public
router.post('/',(req,res) => {
    console.log(req.body);
    
    const { title, price, start_date, end_date, description } = req.body;

    // Simple validation
    if(!title || !price || !start_date || !end_date || !description) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
   const newPackage = new Package({
    ...req.body
   });
console.log( "sending... to mongo db...."

);
   newPackage.save().then(package => res.json(package)).catch((err)=> res.status(400).json({ msg: "Please enter correct information"}));

});

// @route   DELETE api/packages/:id
// @desc    Delete A Package
// @access  Public
router.delete('/:id', (req, res) => {
    Package.findById(req.params.id)
      .then(package => package.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false, msg: "Record not found!" }));
  });

// @route   UPDATE api/packages/:id
// @desc    Update A Package
// @access  Public
router.put('/:id', (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const fieldsInModel = ['title', 'price', 'start_date', 'end_date', 'description', 'is_active']
    const isUpdateAllowed = fieldsToUpdate.every((field) => fieldsInModel.includes(field))

    if(!isUpdateAllowed){
        return res.status(400).json({ msg: 'Invalid field!'})
    }
  
    Package.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((package) => {
        if(!package){
            throw Error("Profile not found!")
        }
        res.json(package)
    })
    .catch(err => res.status(404).json({ success: false, msg: 'Please enter correct information' }));
  });


module.exports = router
