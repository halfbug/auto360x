const express = require ('express');
const router = express.Router();

//User Model
const User = require('../../models/users');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//@route Get api/users
//@desc Get All Users
//@access  Public
router.get('/', (req, res) => {
  //const excluded_fields = ['-password', '-email', '-avatar', '-phone_number', '-address', '-geo_location', '-website', '-description', '-company_logo', '-company_name', '-create_at']
    User.find()
    //.select(excluded_fields)
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ msg: err }))
});

// @route POST api/users
// @desc  Create A User
// @access Public
router.post('/', (req, res, next) => {
    console.log(req.body);
  //  console.log(req.file)
    const { email, fullname, password, avatar, status, last_login, roles, phone_number, address, geo_location, website, description, company_logo, company_name } = req.body;

    // Simple validation
    if(!email || !fullname || !password || !avatar || !status || !last_login || !roles || !phone_number || !address || !geo_location || !website || !description || !company_logo || !company_name) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

  // Check for existing user
  User.findOne({ email })
  .then(user => {
    if(user) return res.status(400).json({ msg: 'This email address is already taken' });

    const newUser = new User({
      ...req.body
    });
console.log( "sending... to mongo db...."
);
newUser.save().then(user => res.json(user)).catch((err)=> res.status(400).json({ msg: "Please enter correct information"}));
})
});

// @route   DELETE api/user/:id
// @desc    Delete A User
// @access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => user.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false, msg: "User not found!" }));
  });

// @route   UPDATE api/user/:id
// @desc    Update A User
// @access  Public
router.put('/:id', (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const fieldsInModel = ['email', 'password', 'fullname', 'avatar', 'status', 'last_login', 'roles', 'phone_number', 'address', 'geo_location', 'website', 'description', 'company_logo', 'company_name']
    const isUpdateAllowed = fieldsToUpdate.every((field) => fieldsInModel.includes(field))

    if(!isUpdateAllowed){
        return res.status(400).json({ msg: 'Invalid field!'})
    }
 
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
        if(!user){
            throw Error("User not found!")
        }
        res.json({
          id: user.id,
          fullname: user.fullname,
          status: user.status,
          roles: user.roles,
          last_login: user.last_login
      })
    })
    .catch(err => res.status(404).json({ success: false, msg: 'Please enter correct information' }));
  });

module.exports = router
