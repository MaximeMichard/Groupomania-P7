const bcrypt = require("bcrypt"); //Plug in pour hasher les passwords //
const jwt = require("jsonwebtoken"); //Plug in pour sécuriser la connection avec des tokens uniques //
const models = require("../models"); //Importation du model User
const passwordvalidator= require ('password-validator'); // Sécurité password // 
require('dotenv').config();

const schema= new passwordvalidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

//Inscription // 

exports.signup = (req, res, next) => {

  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password; 
  let admin= req.body.isAdmin;

  if (!schema.validate(req.body.password)){ // Si schéma correspond pas alors -> error //
    res.status(401).json({
      error: Error.message= 'Schéma incorrect ! '
    });
  }
  else if (schema.validate(req.body.password)){ // Schéma correct exact le script //
    models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (err, bcryptPassword) {
                        // Création de l'user
                        const newUser = models.User.create({
                            email: email,
                            username: username,
                            password: bcryptPassword,
                            isAdmin: admin
                        })
                            .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                            .catch(err => {
                                res.status(500).json({ err })
                            })
                    })
                }
                else {
                    res.status(409).json({ error: 'Cette utilisateur existe déjà ' })
                }
            })
            .catch(err => { res.status(500).json({ err }) })
    }
};

// Connection  //

exports.login = (req, res, next) => {
  let username= req.body.username;
  let password= req.body.password;
  if (username ==null || password == null){
    res.status(400).json({message: 'Il y a une couille dans le paté mon gars! '});
  }
  models.User.findOne({
        where: { username: username }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: user.id,
                            token: "MA BITE ET MON COUTEAU !",
                            isAdmin: user.isAdmin
                        })
                    } else {
                        res.status(403).json({ error: 'invalid password' });
                    };
                })
            } else {
                res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
            }
        })
        .catch(err => { res.status(500).json({ err }) })
};
