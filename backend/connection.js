const Sequelize= require ('sequelize');

//Connection Base de donnée //
const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  })
  try {
    sequelize.authenticate();
    console.log('Connection BDD réussie! ');
  } catch (error) {
    console.error('Error'+ error);
  }
 
module.exports= sequelize;
global.sequelize= sequelize;