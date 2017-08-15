'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER
  });

  StudentSubject.associate = (models)=>{
    StudentSubject.belongsTo(models.Student, {onDelete: 'cascade'})
    StudentSubject.belongsTo(models.Subject, {onDelete: 'cascade'})
  }
  return StudentSubject;
};
