const models= require('../models');

exports.createMedia = async (req,res,next) => {
    try{
        let _mediaCreate= await models.media.create({
            postId: req.body.postId,
            commentaireId: req.body.commentaireId,
            nom:req.body.nom,
            type:req.body.type,
            lien: req.body.lien
        })
        return res.status (200).json ({ _mediaCreate});
    }
    catch(err){
        return res.status(500).json ({ err});
    }
}
exports.getMedia = async(req,res,next) => {
    try{
        let _mediaGet= await models.media.findOne({
            where:{ id: Number (req.params.id)}
        })
        return res.status(200).json({ _mediaGet});
    }
    catch(err){
        return res.status(500).json ({ err});
    }
}
exports.putMedia = async(req,res,next) => {
    const newNom= req.body.newNom;
    const newType= req.body.newType;
    const newLien= req.body.newLien;
    try{
        let _mediaupdate= await models.media.update({
            nom: newNom,
            type: newType,
            lien: newLien    
        },{
            where: {
              id: Number(req.params.id)
            }
            
        });
        let _mediaget= await models.post.findOne({
            where: { id: Number(req.params.id) } 
            });
            return res.status(200).json({ _mediaupdate});
        
    }
    catch(err){ 
        return res.status(500).json ({ err});
    }
}
exports.deleteMedia = async (req,res,next) => {
    try{
        let _mediadelete= await models.media.destroy({
            where:{id: Number(req.params.id)}
        })
        return res.status(200).json ({ _mediadelete});
    }
    catch(err){
        console.log(err);
        return res.status(500).json ({ err});
    }
}
