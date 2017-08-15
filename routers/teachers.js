const express = require('express')
const app = express()

const router = express.Router()
const db = require('../models')

var session = require('express-session');

router.use((req,res, next)=>{
  if(req.session.user.role == 'headmaster'){
    next();
  }else{
    res.send('You have to login as Headmaster');
  }
})


router.get('/', (req, res)=>{
  db.Teacher.findAll({
    include:[db.Subject],
    order:[["id"]]
  })
  .then(data =>{
    res.render('teachers', {teacherData: data})
  })
})

router.get('/add', (req, res)=>{
  db.Subject.findAll()
  .then(data =>{
    res.render('teachers-add-form', {subjectData:data})
  })
})

router.post('/add', (req, res)=>{
  db.Teacher.create({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`,
    SubjectId: `${req.body.subject}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(()=>{
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', (req, res)=>{
  db.Teacher.findById(req.params.id)
  .then((data)=>{
    db.Subject.findAll()
    .then((data2)=>{
      res.render('teachers-edit-form', {teacherData:data, subjectData:data2})
    })
  })
})

router.post('/edit/:id', (req, res)=>{
  db.Teacher.update({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email},`,
    SubjectId: `${req.body.subject}`,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where:{id:`${req.params.id}`}
  })
  .then(()=>{
    res.redirect('/teachers')
  })
})

router.get('/delete/:id', (req, res)=>{
  db.Teacher.destroy({where:{id:`${req.params.id}`}})
  .then(()=>{
    res.redirect('/teachers')
  })
})

module.exports = router;
