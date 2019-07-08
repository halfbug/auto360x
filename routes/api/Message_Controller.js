const express = require ('express');
const router = express.Router();

//Message Model
const Message = require('../../models/messages');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//@route Get api/messages
//@desc Get All messages
//@access  Public
router.get('/', (req,res) => {
    Message.find()
    .then(message => res.json(message))
    .catch(err => res.status(400).json({ msg: err }))
});

// @route POST api/messages
// @desc  Create A Message
// @access Public
router.post('/',(req,res) => {
    console.log(req.body);
    
   const newMessage = new Message({
    ...req.body
   });
console.log( "sending... to mongo db...."

);
   newMessage.save().then(message => res.json(message)).catch((err)=> res.status(400).json({ msg: "Please enter correct information"}));

});

// @route   DELETE api/mesaages/:id
// @desc    Delete A Message
// @access  Public
router.delete('/:id', (req, res) => {
    Message.findById(req.params.id)
      .then(message => message.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false, msg: "Not found!" }));
  });


module.exports = router
