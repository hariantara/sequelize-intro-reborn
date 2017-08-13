const express = require('express')
const app = express()

const router = express.Router()

const db = require('../models')


router.get('/', (req, res)=>{
  res.render('home')
})

module.exports = router
