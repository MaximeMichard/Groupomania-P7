const models= require ('../models');
const fs = require ("fs");
const QueryTypes = require ("sequelize"); 

exports.createPost = async (req,res,next) => {

  try {
    let post = JSON.parse(req.body.post);
    let _postcreate = await models.post.create({
    UserId : req.userId,
    ... post,
    attachment : `${req.protocol}://${req.get("host")}/multimedia/${req.file.filename }`// Génération de l'URL -> http://localhost/images/nomdufichier //
  })
    return res.status(200).json (_postcreate);
  }
  catch(err){
    console.log(err);
    return res.status(500).json ({ error: Error.message= 'Utilisateur existe pas!' });
  }
}

exports.getPost = async (req,res,next) => {

  try{
    let _postget= await models.post.findOne({
    where: { id: Number(req.params.id) } 
    })
    return res.status (200).json ( _postget);
  }

  catch (err) {
    return res.status(500).json ( err); 
  }
  
}

exports.allPost = async (req,res,next) => {
  try{
    let _allPost = await models.post.findAll({
      raw : true,
      nest : true,
    })
    for (let index = 0; index < _allPost.length; index++) {
      let element = _allPost[index];  
      let _user= await models.User.findOne({
        where: { id: Number(element.userId) },
        attributes:{ exclude: ['password']} 
    });
    element.user = _user;
    _allPost[index] = element ;
    }
    return res.status (200).json (_allPost);
  }
  catch(err){
    console.log(err);
    return res.status(500).json (err); 
  }
}

exports.getPostCommentaire= async (req,res,next)=> {
  try{
    let _postwithComment= await models.post.findOne({
      where: { id: Number(req.params.id)},
      include: models.commentaire,
    });

    _postwithComment = _postwithComment.toJSON();

     for (let index = 0; index < _postwithComment.commentaires.length ; index++) {
      let element = _postwithComment.commentaires[index]; 
      let _user= await models.User.findOne({
        where: { id: Number(element.userId) },
        attributes:{ exclude: ['password']} 
    });

    element.user = _user;
    _postwithComment.commentaires[index] = element ;

    }
    
    return res.status (200).json (_postwithComment);
 
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
}

 exports.updatePost = async (req,res,next) => {
  try {
    const post = req.file ?{
      ...JSON.parse(req.body.post),
      attachment : `${req.protocol}://${req.get("host")}/multimedia/${req.file.filename }`,
    }:
    {
      ...req.body
    };
    console.log(post);
    let _updatepost= await models.post.update({
      ...post  
    },
    {where: {id: Number(req.params.id)}});

    return res.status(200).json(_updatepost);
  }

  catch(err){
    return res.status(500).json (err);
  } 
}
  
exports.deletePost = (req,res,next) => {  
  models.post.findOne({ // On cherche l'URL de l'image //
  where: {id: Number(req.params.id)}
})
.then(post => {
  const filename = post.attachment.split("/multimedia/")[1]; // On récupère le fichier //
  fs.unlink(`multimedia/${filename}`, () => { // POur effacer le fichier (unlink)//
    models.post.destroy({ // Supprimer le fichier de la BDD//
      where: {id: Number(req.params.id)}
      })
      .then(() => res.status(200).json({
        message: "Post Supprimé !"
      }))
      .catch((error) => res.status(400).json({
        error
      }));
  });
})
} 

