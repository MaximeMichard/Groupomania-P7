const express = require('express'); // Importation package Express --> Framework Node.JS //
const bodyParser = require('body-parser'); // Importation package BodyParser --> Extrait Objet -> Format JSON//
const mariadb= require ('mariadb'); //Connectin BDD //
const path= require ('path'); //Importation package Path --> Fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires  // 
require('dotenv').config()

/* const sauceRoutes = require('./routes/sauce'); //Importation ficher Routes/sauce.js //
const userRoutes = require('./routes/user'); //Importation ficher Routes/user.js // */

const app = express(); //Utilisation Express //

app.use((req, res, next) => { // Middleware (CORS) //
  res.setHeader('Access-Control-Allow-Origin', '*'); // All accès API //
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Headers requête possible //
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Requête possible //
  next();
});

//Connection Base de donnée //
const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, connectionLimit: 5});
pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT 1 as val")
        .then(rows => { // rows: [ {val: 1}, meta: ... ]
          return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        })
        .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.release(); // release to pool
        })
        .catch(err => {
          conn.release(); // release to pool
        })
        
    }).catch(err => {
      'Connection à la BDD échouée ! '
    });



app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Application utilise Image //
/* app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);  */


module.exports = app; // Exportation pour le fichier server.js //