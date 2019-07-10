const express = require ('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config/keys')


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('start featching vehicle detail ');
    next(); // make sure we go to the next routes and don't stop here
});

/*
Service Provider : https://www.carmakemodeldb.com/docs
Api Url : https://carmakemodeldb.com/api/v1/
purpos : fetching car make , model and other related information

*/
function getArray(obj,key){
  //@desc it will transform array of objects to the simple array

   const List = [];
 
    const detail = Object.values(obj)
 
    for (const item of detail) {
    //   console.log(item);
    List.push(item[key].trim())

    }

    return List;
}
// @route POST api/details/allmake 
// @desc  Get all makes 
// @access Public
router.get('/allmake', (req, res) => {
    let makeList = [];
    // axios.get('https://carmakemodeldb.com/api/v1/car-lists/get/all/makes?api_token='+config.carmakemodeldb.Tocken)
    // .then(response => {
        
    //      res.send(getArray(response.data,"make"));
    // })
    // .catch(error => {
    //    res.send({error : error});
    // });
  res.send(["AC","Acura","Alfa Romeo","Am General","American Motors","Aston Martin","Auburn","Audi","Austin","Austin-Healey","Avanti Motors","Bentley","BMW","Bricklin","Bugatti","Buick","Cadillac","Checker","Chevrolet","Chrysler","Citroen","Daewoo","Daihatsu","Datsun","Delahaye","Delorean","Desoto","DeTomaso","Dodge","Eagle","Edsel","Essex","Ferrari","FIAT","Fisker","Ford","Franklin","Genesis","Geo","GMC","Honda","Hudson","Hummer","Hupmobile","Hyundai","INFINITI","International","Isuzu","Jaguar","Jeep","Jensen","Kaiser","Karma","Kia","Koenigsegg","Lamborghini","Lancia","Land Rover","LaSalle","Lexus","Lincoln","Lotus","Maserati","Maybach","Mazda","McLaren","Mercedes-Benz","Mercury","Merkur","MG","MINI","Mitsubishi","Morgan","Morris","Nash","Nissan","Oldsmobile","Opel","Packard","Panoz","Peugeot","Plymouth","Pontiac","Porsche","Qvale","RAM","Renault","Rolls-Royce","Rover","Saab","Saleen","Saturn","Scion","smart","Spyker","Sterling","Studebaker","Subaru","Sunbeam","Suzuki","Tesla","Toyota","Triumph","TVR","Volkswagen","Volvo","Willys","Yugo"])
  });


  // @route POST api/details/ 
// @desc  Get all makes 
// @access Public
router.get("/model/:make/:year?", (req, res) => {
  let makeList = [];
  console.log(req.params.make)
  // req.params.id
  if(!req.params.year)
  axios.get('https://carmakemodeldb.com/api/v1/car-lists/get/all/models/'+req.params.make+'?api_token='+config.carmakemodeldb.Tocken)
  .then(response => {
        
       res.send(getArray(response.data,"model"));
  })
  .catch(error => {
     res.send({error : error});
  });
  else
  axios.get('https://carmakemodeldb.com/api/v1/car-lists/get/models/'+req.params.year+'/'+req.params.make+'?api_token='+config.carmakemodeldb.Tocken)
  .then(response => {
        
       res.send(getArray(response.data,"model"));
  })
  .catch(error => {
     res.send({error : error});
  });

});

router.get("/allyears", (req, res) => {
  
  // req.params.id
  axios.get('https://carmakemodeldb.com/api/v1/car-lists/get/years/desc?api_token='+config.carmakemodeldb.Tocken)
  .then(response => {
     
       res.send(getArray(response.data,"year"));
  })
  .catch(error => {
     res.send({error : error});
  });
});

// @route POST api/details/trim 
// @desc  Get all trims by year make and model 
// @access Public
router.get('/trim/:year/:make/:model', (req, res) => {
  let makeList = [];
  axios.get('https://carmakemodeldb.com/api/v1/car-lists/get/trims/'+req.params.year+'/'+req.params.make+'/'+req.params.model+'?api_token='+config.carmakemodeldb.Tocken)
  .then(response => {
      
       res.send(getArray(response.data,"trim"));
  })
  .catch(error => {
     res.send({error : error});
  });
});

// @route POST api/details/bodystyle 
// @desc  Get all available body style
// @access Public
router.get('/bodystyle', (req, res) => {
  let makeList = [];
  axios.get('https://carmakemodeldb.com/api/v1/car-lists/get/body-styles/asc?api_token='+config.carmakemodeldb.Tocken)
  .then(response => {
      
       res.send(getArray(response.data,"style"));
  })
  .catch(error => {
     res.send({error : error});
  });
});

// @route POST api/details/drivetypes 
// @desc  Get all available body style
// @access Public
router.get('/drivetypes', (req, res) => {
  let makeList = [];
  axios.get('https://carmakemodeldb.com/api/v1/car-lists/get/drive-types/desc?api_token='+config.carmakemodeldb.Tocken)
  .then(response => {
      
       res.send(getArray(response.data,"type"));
  })
  .catch(error => {
     res.send({error : error});
  });
});
  module.exports = router