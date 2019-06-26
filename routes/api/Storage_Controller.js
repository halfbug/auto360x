const express = require ('express');
const router = express.Router();
const cloudinary = require('cloudinary')
const config = require('../../config/keys')

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('connecting cloud storage ');
    next(); // make sure we go to the next routes and don't stop here
});

cloudinary.config( config.cloudinary )
router.post('/', (req, res) => {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
console.log("uploading image to cloud storage")    
    Promise
      .all(promises)
      .then(results => res.json(results))
      .catch((err) => res.status(400).json(err))
  });

  module.exports = router