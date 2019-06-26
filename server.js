const express = require('express')
const mongoose = require('mongoose')
<<<<<<< HEAD
// const bodyParser = require('body-Parser')
const path = require('path');
=======
const bodyParser = require('body-Parser')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const config = require('./config/keys')
>>>>>>> dev

const vehicles_routes = require('./routes/api/Vehical_Controller')
const storage_routes = require('./routes/api/Storage_Controller')
const detail_routes = require('./routes/api/Detail_Controller')

const app = express();

//Bodyparser Middleware
app.use(express.json())

// DB Config
const db = config.mongoURI;

mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=> console.log("MongoDB Connected..."))
    .catch(err => console.log("E R R O R   A   H E A D -->  "+err));
    
app.get('/api/test', function (req, res) {
        res.send('hello world')
      });

app.use('/api/vehicles', vehicles_routes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
  }
  
app.use(cors({ 
    origin: config.clientOrigin
  })) 
  console.log("client at : "+config.clientOrigin )
  
app.use(formData.parse())

app.use('/api/storage', storage_routes);
app.use('/api/detail', detail_routes);


    const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server started on port ${port}`))
