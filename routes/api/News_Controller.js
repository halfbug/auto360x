const express = require ('express');
const router = express.Router();
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './uploads')
//   },
//   filename: function(req, file, cb){
//     cb(null, new Date().toDateString() + file.originalname)
//   }
// })

// const fileFilter = (req, file, cb) => {
//   //reject a file
//   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
//     cb(null, true)
//   }
//   else{
//     cb(new Error('Please select correct file to upload.'), false)
//   }
// }

// const upload = multer({ 
//   storage: storage, 
//   limits: {
//   fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// })

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
    .then(news => res.json(news));
});

// @route POST api/news
// @desc  Create A News
// @access Public
// router.post('/', upload.single('image'), (req, res, next) => {
  router.post('/', (req, res, next) => {
    console.log(req.body);
   // console.log(req.file)
    const { title, content, status, author, update_at } = req.body;

    // Simple validation
    if(!title || !content || !status || !author || !update_at) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
   const newNews = new News({
    //...req.body,
    title: req.body.title,
    content: req.body.content,
    post_date: req.body.post_date,
    status: req.body.status,
    author: req.body.author,
    update_at: req.body.update_at,
    image: req.file.path
   });
console.log( "sending... to mongo db...."

);
   newNews.save().then(news => res.json(news)).catch((err)=> res.status(400).json(err));

});

// @route   DELETE api/news/:id
// @desc    Delete A News
// @access  Public
router.delete('/:id', (req, res) => {
    News.findById(req.params.id)
      .then(news => news.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false, err: "News not found!" }));
  });

// @route   UPDATE api/news/:id
// @desc    Update A News
// @access  Public
router.put('/:id', (req, res) => {
    const fieldsToUpdate = Object.keys(req.body)
    const fieldsInModel = ['title', 'content', 'post_date', 'status', 'author', 'create_at', 'update_at']
    const isUpdateAllowed = fieldsToUpdate.every((field) => fieldsInModel.includes(field))

    if(!isUpdateAllowed){
        return res.status(400).json({ error: 'Invalid field!'})
    }

    News.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((news) => {
        if(!news){
            throw Error("News not found!")
        }
        res.json(news)
    })
    .catch(err => res.status(404).json({ success: false }));
  });


// -------- Image upload ----------------- //

// const fileUpload = multer({
//   //dest: 'uploadsFolder' /*folder name on the server */,
//   //storage,
//   limits: { //limits is in bytes
//       fileSize: 1000000 //for not more than 1MB
//   },
//   fileFilter(req, file, cb) {
//       //if(!file.originalname.endsWith('.jpg')) {
//       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ //we've used regular expression to allow for multiple file extensions
//           return cb(new Error('Please upload a jpg file!'))
//       }

//       cb(undefined, true) //undefined means no error & true is for carry on with file upload and false is for cancel file upload
//   }
// })


// router.post('/profiles/uploadfile', fileUpload.single('avatar'), async(req, res) => {
//   // req.profile.avatar /* avatar will be the key of profile object like other keys e.g. name, age, email */= req.file.buffer // this will be the value of that key. Jab bhi hum upload krte hain koi file tou req.body k bjae req.file use krte hain
//   // await req.profile.save()

//   const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200}).png().toBuffer()
//   req.profile.avatar = buffer
//   //req.profile.avatar = req.file.buffer
//   await req.profile.save()

//   res.send("Profile picture has been uploaded successfully!")
// },  (error, req, res, next) => { //error will be fall into the last callback of our route    
//   res.status(400).send({ error: error.message })
// })

// ------------- To Delete an Image ----------------

router.delete('/profiles/myavatar', async(req, res) => {
  req.profile.avatar = undefined //here we set profile.avatar equals to undefined so the avatar value in the db will be replaced by null or undefined, hence avatar deleted
  await req.profile.save()
  res.send("Avatar has been deleted successfully!")
})

// ----------- To Retreive Image from db ---------
router.get('/profiles/myprofile/avatar', async(req, res) => {
  try{
      const profile = req.profile
      if(!profile.avatar){
          throw new Error("No avatar found!")
      }


      res.set('Content-Type', 'image/png')// this thing will tell the client side browser that the data you are going to get is/ getting is an image.jpg file, normally hamara Content-Type JSON hota hai
      res.send(profile.avatar)
  }
  catch(e){

  }
})

module.exports = router
