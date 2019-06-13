const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-Parser')
const path = require('path');

const vehicles_routes = require('./routes/api/Vehical_Controller')

const app = express();

//Bodyparser Middleware
app.use(express.json())

// DB Config
const db = require ('./config/keys').mongoURI;

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
  


    const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server started on port ${port}`))
