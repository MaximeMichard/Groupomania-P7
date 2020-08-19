const express = require('express'); // Importation package Express --> Framework Node.JS //
const bodyParser = require('body-parser'); // Importation package BodyParser --> Extrait Objet -> Format JSON//
const path= require ('path'); //Importation package Path --> Fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires  // 
const helmet= require ('helmet'); 
/* const postRoutes= require ('./routes/post'); */
const userRoutes= require ('./routes/user');


const app = express(); //Utilisation Express //

app.use((req, res, next) => { // Middleware (CORS) //
  res.setHeader('Access-Control-Allow-Origin', '*'); // All accès API //
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Headers requête possible //
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Requête possible //
  next();
});

require('./models/connection'); 

app.use(helmet());
app.use(bodyParser.json());
app.use('/multimedia', express.static(path.join(__dirname, 'images'))); // Application utilise Image //
/* app.use('/api/post', postRoutes); */
app.use('/api/auth', userRoutes);

app.get('/', function (req,res) {
  res.status(200).send ('<h1>Ceci est un test </h1>');
})


module.exports = app; // Exportation pour le fichier server.js //