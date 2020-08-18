const Sequelize= require ('sequelize');
require('dotenv').config()

//Connection Base de donnée //
const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  })
sequelize.authenticate()
.then(()=> console.log('Connection BDD réussie! '))
.catch(err => console.log('Error'+ err));

module.exports= sequelize;
global.sequelize= sequelize; 

