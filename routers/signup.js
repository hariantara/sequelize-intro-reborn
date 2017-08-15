const express = require('express');
var router = express.Router();
const database = require('../models');
var session = require('express-session');

router.get('/', (req, res)=>{
  database.User.findAll()
  .then((data)=>{
    res.render('signup-form', {userData:data})
  })
})

router.post('/', (req, res)=>{
  database.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(()=>{
    res.redirect('/login')
  })
})

module.exports = router
