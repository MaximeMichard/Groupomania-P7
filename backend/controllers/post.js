const models= require ('../models');
const fs = require ("fs");

exports.createPost = async(req,res,next) => {

  try {
    let _postcreate = await models.post.create({
    UserId: req.userId,
    title:req.body.title,
    content:req.body.content,
    attachment: req.body.attachment
    /* attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename }` */ // Génération de l'URL -> http://localhost/images/nomdufichier //
  })
    return res.status(200).json (_postcreate);
  }
  catch(err){
    console.log( err); 
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
    let _allPost = await models.post.findAll()
    return res.status (200).json (_allPost);
  }
  catch(err){
    return res.status(500).json (err); 
  }
}

exports.getPostCommentaire= async (req,res,next)=> {
  try{
    let _get= await models.post.findOne({
      where: { id: Number(req.params.id)},
      include: [{
        model: models.commentaire,
      }]
    })
    return res.status (200).json (_get); 
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
}

 exports.updatePost = async (req,res,next) => {
  const newTitle = req.body.newTitle;
  const newContent= req.body.newContent;
  const newAttachment= req.body.newAttachment;

  try {
    await models.post.update({ 
      title: newTitle, 
      content: newContent,
      attachment:newAttachment 
    },{where: {id: Number(req.params.id)}});

    let _postget= await models.post.findOne({
      where: { id: Number(req.params.id) } 
      });
      return res.status(200).json( _postget);
  }

  catch(err){
    return res.status(500).json (err);
  } 
}
  
exports.deletePost = async (req,res,next) => {  
  try {
    let _postdelete= await models.post.destroy({
      where: {id: Number(req.params.id)}
    });
    return res.status(200).json({_postdelete}); 
  }
  catch(err){
    console.log(err);
    return res.status(500).json ({err});
  }
}  

