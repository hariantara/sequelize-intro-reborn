const express = require('express');
const app = express()

const router = express.Router()
const db = require('../models')

var session = require('express-session');

router.use((req,res, next)=>{
  if(req.session.user.role == 'academic'){
    next();
  }else{
    res.send('You have to login as Headmaster');
  }
})

router.get('/', (req, res)=>{
  db.Subject.findAll({
    include:[db.Teacher],
    order:[["id"]]
  })
  .then(data =>{
    res.render('subjects', {subjectData:data})
  })
})

router.get('/add', (req, res)=>{
  res.render('subjects-add-form')
})

router.post('/add', (req, res)=>{
  db.Subject.create({
    subject_name: `${req.body.subject_name}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(()=>{
    res.redirect('/subjects')
  })
})

router.get('/enrollment/:id', (req, res)=>{
  db.StudentSubject.findAll({
    where:{
      SubjectId:req.params.id
    },
    include:{all:true}
  })
  .then(data =>{
    res.render('subjects-enrollment', {allData:data})
  })
})

router.get('/edit/:id', (req, res)=>{
  db.Subject.findById(req.params.id)
  .then(data =>{
    res.render('subjects-edit-form', {subjectData:data})
  })
})

router.post('/edit/:id', (req, res)=>{
  db.Subject.update({
    subject_name: `${req.body.subject_name}`,
    createdAt: new Date(),
    updatedAt: new Date()
  },{where:{id: `${req.params.id}`}})
  .then(()=>{
    res.redirect('/subjects')
  })
})

router.get('/delete/:id', (req, res)=>{
  db.Subject.destroy({where:{id:`${req.params.id}`}})
  .then(()=>{
    db.StudentSubject.destroy({where:{SubjectId: `${req.params.id}`}})
    .then(()=>{
      db.Teacher.destroy({where:{SubjectId:`${req.params.id}`}})
      .then(()=>{
        res.redirect('/subjects')
      })
    })
  })
})

router.get('/score/:idSt/:idSb', (req, res)=>{
  db.Student.findAll({where:{id:`${req.params.idSt}`}})
  .then((data)=>{
    db.Subject.findAll({where:{id:`${req.params.idSb}`}})
    .then((data2)=>{
      res.render('student-givescore', {studentData:data, subjectData:data2})
    })
  })
})

router.post('/score/:idSt/:idSb', (req, res)=>{
  db.StudentSubject.update({
    Score: req.body.score
  },{
    where:{
      StudentId:req.params.idSt
    }
  })
  .then(()=>{
    res.redirect(`/subjects/enrollment/${req.params.idSb}`)
  })
})

module.exports= router
