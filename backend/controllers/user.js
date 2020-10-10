const bcrypt = require("bcrypt"); //Plug in pour hasher les passwords //
const jwt = require ('jsonwebtoken'); //Plug in pour sécuriser la connection avec des tokens uniques //
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
  else if (schema.validate(req.body.password)){ // Schéma correct exact avec le script //
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
                            isAdmin: false
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
    res.status(400).json({message: 'Il manque un paramètre ! '});
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
                            token: jwt.sign({userId: user.id},"BONJOUR1234",{
                                expiresIn:"24h",
                            }
                            ),
                            isAdmin : user.isAdmin
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

exports.getUserProfile = async (req,res,next) => {
    try{
        let _userget= await models.User.findOne({
            where: { id: Number(req.params.id) },
            attributes:{ exclude: ['password']} 
        })
        return res.status(200).json( _userget);
        
    }
    catch(err){
        return res.status(404).json({ err});
    }
}

exports.updatePwd= (req,res,next) => {
  const newPassword = req.body.newPassword;
  if (schema.validate(newPassword)) {
      //Vérifie qu'il est différent de l'ancien
      models.User.findOne({
          where: { id: Number(req.params.id) }
      })
          .then(user => {
              bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                  //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                  if (resComparePassword) {
                      res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                  } else {
                      bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                          models.User.update(
                              { password: bcryptNewPassword },
                              { where: { id: Number(req.params.id) } }
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
exports.delete = async (req,res,next) => {
    try {
        let _userdelete = await  models.User.destroy({ // Supprimer le fichier de la BDD//
            where: { id: Number(req.params.id) }
        })
        return res.status(200).json( _userdelete ); 
    }
    catch(err){
        return res.status(500).json({ err});
    }          
}
