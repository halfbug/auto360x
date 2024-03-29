const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-Parser')
const path = require('path');
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const config = require('./config/keys')
const vehicles_routes = require('./routes/api/Vehical_Controller')
const packages_routes = require('./routes/api/Package_Controller')
const news_routes = require('./routes/api/News_Controller')
const storage_routes = require('./routes/api/Storage_Controller')
const detail_routes = require('./routes/api/Detail_Controller')
const users_routes = require('./routes/api/User_Controller')
const messages_routes = require('./routes/api/Message_Controller')
const auth_routes = require('./routes/api/Auth_Controller')
const clientQueries_routes = require('./routes/api/ClientQueries_Controller')


const app = express();
app.use('/uploads', express.static('uploads'))
app.use(cors());

//Bodyparser Middleware
app.use(express.json())

// DB Config
const db = config.mongoURI;

mongoose
    .connect(db,{ 
      useNewUrlParser: true , useCreateIndex : true})
    .then(()=> console.log("MongoDB Connected..."))
    .catch(err => console.log("E R R O R   A   H E A D -->  "+err));
    app.use(cors({ 
      origin: config.clientOrigin
    })) 
    
    console.log("client at : "+config.clientOrigin )
    
    app.use(formData.parse())
    
    
app.get('/api/test', function (req, res) {
        res.send('hello world')
      });

app.use('/api/vehicles', vehicles_routes);
app.use('/api/packages', packages_routes)
app.use('/api/news', news_routes)
app.use('/api/storage', storage_routes);
app.use('/api/detail', detail_routes);
app.use('/api/users', users_routes)
app.use('/api/messages', messages_routes)
app.use('/api/auth', auth_routes)
app.use('/api/clientQueries', clientQueries_routes)

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
