const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
var session = require('express-session');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

const homes = require('./routers/home')
app.use('/home', homes)

const teachers = require('./routers/teachers')
app.use('/teachers', teachers)

const subjects = require('./routers/subjects')
app.use('/subjects', subjects)

const students = require('./routers/students')
app.use('/students', students)

const logins = require('./routers/login')
app.use('/login', logins)

const signups = require('./routers/signup')
app.use('/', signups)

app.listen(process.env.PORT || 3000);
