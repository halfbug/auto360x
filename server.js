const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-Parser')
// const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const vehicles_routes = require('./routes/api/Vehical_Controller')
const packages_routes = require('./routes/api/Package_Controller')
const news_routes = require('./routes/api/News_Controller')
const storage_routes = require('./routes/api/Storage_Controller')
const config = require('./config/keys')


const app = express();
app.use('/uploads', express.static('uploads'))
app.use(cors());

//Bodyparser Middleware
app.use(express.json())

// DB Config
const db = require ('./config/keys').mongoURI;

mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=> console.log("MongoDB Connected..."))
    .catch(err => console.log("E R R O R   A   H E A D -->  "+err));
    
app.get('/', function (req, res) {
        res.send('hello world')
      });

app.use('/api/vehicles', vehicles_routes);
app.use('/api/packages', packages_routes)
app.use('/api/news', news_routes)

app.use(formData.parse())

app.use('/api/storage', storage_routes);
 
    const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server started on port ${port}`))
