var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var usersModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('login');
});

router.post('/sign-up', async function(req, res, next) {

  var newUser = new usersModel ({
    name: req.body.name,
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password
    });

    console.log(newUser)

    let userInfo = await usersModel.find(
      {email: req.body.email}
    );

    if(userInfo.length == 0){
      var userSaved = await newUser.save();
      req.session.user = {name: req.body.firstName, id: userSaved._id};
      console.log(req.session.user)
      res.render('oneway', { data: 'Express'});
    }
    else{
      res.render('login', { Alerte: "Utilisateur déjà existant"});
    }
});

router.post('/sign-in', async function(req, res, next) {
let userInfo = await usersModel.find(
{email: req.body.email, password: req.body.password}
);
console.log(userInfo)
if(userInfo.length == 0){
res.render('login', {Alerte: "Identifiants non correspondant"});
}
else{
req.session.user = {name: userInfo[0].name, id: userInfo[0]._id};
res.render('oneway', { userInfo: userInfo});
}
console.log(req.session.user)
});

router.get('/logout', async function(req, res, next) {
  req.session = null; //Ne pas mettre [] à la palce de null sinon bug
  console.log(req.session);
  res.render('login');
});

module.exports = router;
