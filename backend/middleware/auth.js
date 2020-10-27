const jwt = require("jsonwebtoken"); //Importation de jsnwebtoken pour le système de token //
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1]; //Récupération du token provenant de la requête //
    let decodedToken = jwt.verify(token, `${process.env.DB_TOKEN}`); //Fonction pour décoder le token //
    let userId = decodedToken.userId; //récupération du user ID //
    if (userId == null) { //Si le décodage est mauvais alors --> // req.body.userId && req.body.userId !== userId //
      throw "Invalid user ID";
    } else {
      req.userId= userId;
      next();
      userId = null;
    }
  } catch {
    res.status(401).json({
      error: Error.message= 'Requête invalide, erreur Token !'
    });
  }
};
