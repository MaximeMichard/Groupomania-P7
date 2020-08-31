const models= require('../models');

exports.createCommentaire = async (req,res,next) => {
    await models.commentaire.create({
        contenu: req.body.contenu
    });
    return res.status(200).json({ message:"Commentaire crée !"});
}
exports.getCommentaire =  async(req,res,next) => {
    await models.commentaire.findOne({
        where: {
            id: Number(req.params.id)
           }
    });
    return res.status(200).json({ commentaire });
}
exports.updateCommentaire =  async(req,res,next) => {
    const newContenu= req.body.contenu;
    await models.commentaire.update({ 
        content: newContenu 
      },{
        where: {
          id: Number(req.params.id)
        }
      });
      return res.status(200).json({ commentaire });
    
}
exports.deleteCommentaire =  async(req,res,next) => {
    await models.commentaire.destroy({
        where: { id: Number (req.params.id)}
    })
    return res.Status(200).json({message: "Commentaire Supprimé! "})
}