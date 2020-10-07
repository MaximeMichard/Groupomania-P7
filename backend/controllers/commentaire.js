const models= require('../models');

exports.createCommentaire = async (req,res,next) => {
    console.log(req.body);
    try{
        let _commentairecreate= await models.commentaire.create({
            UserId: req.userId,
            postId: req.body.postId,
            content: req.body.content,
        });
        return res.status(200).json( _commentairecreate );
    }
    catch(err){
        console.log(err);
        return res.status(404).json({ err});
    }
    
}
exports.getCommentaire =  async(req,res,next) => {
    try{
       let _commentaireGet= await models.commentaire.findOne({
            where: {
                id: Number(req.params.id)
               }
        });
        return res.status(200).json( _commentaireGet );
    }
    catch(err){
        return res.status(404).json({ err});
    }
}
exports.updateCommentaire =  async(req,res,next) => {
    try{
        const newContenu= req.body.contenu;
        let _commentaireupdate = await models.commentaire.update({ 
            content: newContenu 
          },{
            where: {
              id: Number(req.params.id)
            }
          });
          return res.status(200).json( _commentaireupdate );
    }
    catch(err){
        return res.status(404).json({ err});
    }
    
    
    
}
exports.deleteCommentaire =  async(req,res,next) => {
    try{
        let _commentairedelete =  await models.commentaire.destroy({
            where: { id: Number (req.params.id)}
        })
        return res.status(200).json(_commentairedelete);
    }
    catch (err){
        console.log(err);
        return res.status(404).json ({ err}); 
    }
   
}