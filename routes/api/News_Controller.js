const express = require ('express');
const router = express.Router();

//News Model
const News = require('../../models/news');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//@route Get api/news
//@desc Get All News
//@access  Public
router.get('/', (req,res) => {
    News.find()
    .then(news => res.json(news))
    .catch(err => res.status(400).json({ msg: err }))
});

// @route POST api/news
// @desc  Create A News
// @access Public
router.post('/', (req, res, next) => {
    console.log(req.body);
  //  console.log(req.file)
    const { title, content, status, author, update_at, image } = req.body;

    // Simple validation
    if(!title || !content || !status || !author || !update_at, !image) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
   const newNews = new News({
    ...req.body
   });
console.log( "sending... to mongo db...."

);
   newNews.save().then(news => res.json(news)).catch((err)=> res.status(400).json({ msg: "Please enter correct information"}));

});

// @route   DELETE api/news/:id
// @desc    Delete A News
// @access  Public
router.delete('/:id', (req, res) => {
    News.findById(req.params.id)
      .then(news => news.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false, msg: "News not found!" }));
  });

// @route   UPDATE api/news/:id
// @desc    Update A News
// @access  Public
router.put('/:id', (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const fieldsInModel = ['title', 'content', 'post_date', 'status', 'image', 'author', 'update_at']
    const isUpdateAllowed = fieldsToUpdate.every((field) => fieldsInModel.includes(field))

    if(!isUpdateAllowed){
        return res.status(400).json({ msg: 'Invalid field!'})
    }
 
    News.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((news) => {
        if(!news){
            throw Error("News not found!")
        }
        res.json(news)
    })
    .catch(err => res.status(404).json({ success: false, msg: 'Please enter correct information' }));
  });

module.exports = router
