'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: "First Name Should Fill"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: "Last Name Should Fill"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Fill the right email format"
        },
        isUnique: function(value, next){
          //console.log("=x=x=x>",this);
          var self = this;// nangkap id dari students
          Student.find({
            where:{email:value},
            attributes: ['id']
          }).then(function(data){
            if(data){
              //console.log('data ====>',data);
              if(data.id == self.id){
                next()
              }
              else {
                return next('Email address already in use!');
              }
            }
            next();
          })
        }
      }
    }
  });

  Student.associate = (models)=>{
    Student.belongsToMany(models.Subject,{through:models.StudentSubject, onDelete: 'cascade'})
  }

  return Student;
};
