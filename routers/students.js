const express = require('express');
const app = express()

const router = express.Router()
const db = require('../models')

router.get('/', (req, res)=>{
  db.Student.findAll({order:[["id"]]})
  .then(data =>{
    res.render('students', {studentData:data})
  })
})

router.get('/add', (req, res)=>{
  res.render('students-add-form', {err: null})
})

router.post('/add', (req, res)=>{
  db.Student.create({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(()=>{
    res.redirect('/students')
  })
  .catch(err=>{
    //console.log("=====>>", err.errors[0].message);
    //console.log("====>>>>>",err.errors[0].message);
    res.render("students-add-form", {err: err.errors[0].message})
  })
})

router.get('/enroll/:id', (req, res)=>{
  db.Student.findById(req.params.id)
  .then((data)=>{
    db.Subject.findAll()
    .then((data2)=>{
      res.render('students-add-subject', {studentData:data, subjectData:data2})
    })
  })
})

router.post('/enroll/:id', (req, res)=>{
  db.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: `${req.body.subject}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(()=>{
    res.redirect('/students')
  })
})

router.get('/edit/:id', (req, res)=>{
  db.Student.findById(req.params.id)
  .then(data=>{
    res.render('students-edit-form', {studentData:data, err: null})
  })
})

router.post('/edit/:id', (req, res)=>{
  db.Student.update({
    id:`${req.params.id}`,//untuk nangkap validasi di edit, agar tidak masuk kedalam errors jika sama
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where:{id: `${req.params.id}`}
  })
  .then(()=>{
    res.redirect('/students')
  })
})

router.get('/delete/:id', (req, res)=>{
  db.Student.destroy({where:{id:`${req.params.id}`}})
  .then(()=>{
    res.redirect('/students')
  })
})

module.exports = router
