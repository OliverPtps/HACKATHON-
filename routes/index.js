var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/ticket');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

var alerte = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  

  
  res.render('login', { title: 'Express' });
});

router.get('/oneway', function(req, res, next) {
  
  res.render('oneway', { title: 'Express' });
});

router.post('/search', async function(req, res, next) {
  var travelFound = await journeyModel.find(
    { departure: req.body.from, arrival: req.body.to, date : req.body.when}
 );
 
  res.render('resultats', { travelFound: travelFound });
});

router.get('/redirect', function(req, res, next) {
  
  res.render('redirect', { title: 'Express' });
});

router.get('/resultats', function(req, res, next) {
  
  res.render('resultats', { title: 'Express' });
});

// // Remplissage de la base de donnée, une fois suffit
// router.get('/save', async function(req, res, next) {

//   // How many journeys we want
//   var count = 300

//   // Save  ---------------------------------------------------
//     for(var i = 0; i< count; i++){

//     departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//     arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//     if(departureCity != arrivalCity){

//       var newUser = new journeyModel ({
//         departure: departureCity , 
//         arrival: arrivalCity, 
//         date: date[Math.floor(Math.random() * Math.floor(date.length))],
//         departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//         price: Math.floor(Math.random() * Math.floor(125)) + 25,
//       });
       
//        await newUser.save();

//     }

//   }
//   res.render('index', { title: 'Express' });
// });


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
