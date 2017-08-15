const express = require('express');
var router = express.Router();
const database = require('../models');
var session = require('express-session');
const helper = require('../helper/hash')

router.get('/', function(req, res){
  res.render('login-form')
})

router.get('/', function(req, res){
  if(req.session.user)
  {
    res.redirect('/teachers')
  }
  else{
    res.render('login-form')
  }
})

router.post('/', function(req, res){
  if(!req.body.username || !req.body.password)
  {
    res.send('Masukan pls')
  }
  else{
    database.User.findOne({
      where:{ username: req.body.username}
    })
    .then(data =>{
      //console.log("====>",data);
      //console.log("=====>",data.password);
      //console.log("---->", req.body.password);

      req.body.password = helper.cryptoGraph(req.body.password, data.secretkey)
      console.log("=x=x=>",req.body.password);
      if(data.password == req.body.password)
      {
        //console.log("dataaaaaaaaaaaaa",data.role);
        req.session.user =
        {
          username: req.body.username,
          role: data.role
        }
        //console.log("====>", req.session.user);
        if(data.role == 'teacher')
        {
          res.redirect('/students')
        }
        else if (data.role == 'academic')
        {
          res.redirect('/subjects')
        }
        else {
          res.redirect('/teachers')
        }
      }
      else {
        res.send('wrong password')
      }
    })
    .catch(err => {
      res.send('user not found')
    })
  }
})

router.get('/logout', function(req, res){
  req.session.destroy(() =>{
    res.redirect('/')
  })
})

module.exports = router;
