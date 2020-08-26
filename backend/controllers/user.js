const bcrypt = require("bcrypt"); //Plug in pour hasher les passwords //
const jwt = require ('jsonwebtoken'); //Plug in pour sécuriser la connection avec des tokens uniques //
const jwtutils= require ('../utils/jwt.utils');
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

  if (email == null || username== null || password ==null ){
      res.status(400).json({error: 'Il manque un paramètre! '});
  }

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
                    bcrypt.hash(password, 10, function (errBcrypt, resBcrypt) {
                        // Création de l'user
                        const newUser = models.User.create({
                            email: email,
                            username: username,
                            password: resBcrypt,
                            isAdmin: 0 /* false */
                        })
                            .then(newUser => { res.status(201).json({ 'userId': newUser.id }) })
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
  let email= req.body.email;
  let password= req.body.password;
  if (email ==null || password == null){
    res.status(400).json({message: 'Il y a une couille dans le paté mon gars! '});
  }
  models.User.findOne({
        where: { email: email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errBcrypt, resBcrypt) => {
                    if (resBcrypt) {
                        res.status(200).json({
                            userId: user.id,
                            token: jwt.sign({userId: user._id},"BONJOUR1234",{
                                expiresIn:"24",
                            })
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

exports.getUserProfile = (req,res,next) => {
      
    models.User.findOne({
        id: req.params.id
    })
    .then((User) => res.status(200).json(User))
    .catch((error) => res.status(404).json({
      error
    }));
}
exports.updatePwd= (req,res,next) => {
  const newPassword = req.body.newPassword;
  //Vérification regex du nouveau mot de passe
  if (schema.validate(newPassword)) {
      //Vérifie qu'il est différent de l'ancien
      models.User.findOne({
          where: { id: userId }
      })
          .then(user => {
              console.log('user trouvé', user)
              bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                  //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                  if (resComparePassword) {
                      res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                  } else {
                      bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                          models.User.update(
                              { password: bcryptNewPassword },
                              { where: { id: user.id } }
                          )
                              .then(() => res.status(201).json({ confirmation: 'mot de passe modifié avec succès' }))
                              .catch(err => res.status(500).json(err))
                      })
                  }
              })
          })
          .catch(err => json(err))
  } else {
      res.status(406).json({ error: 'mot de passe non valide' })
  }
    
}

exports.delete = (req,res,next) => {  
  models.User.destroy({ 
      _id: req.params.id
    })
      .then(() => models.User.destroy({where: {id: userId}}))
      .then(() => res.status(204).json({ message:"Utilisateur Supprimé "}))
      .catch(error => res.status(400).json({ error })); 
}
