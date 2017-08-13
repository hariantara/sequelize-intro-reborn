const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const homes = require('./routers/home')
app.use('/home', homes)

const teachers = require('./routers/teachers')
app.use('/teachers', teachers)

const subjects = require('./routers/subjects')
app.use('/subjects', subjects)

const students = require('./routers/students')
app.use('/students', students)

app.listen(3000)
