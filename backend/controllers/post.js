const models= require ('../models');

exports.createPost = async(req,res,next) => {

  try {
    let _postcreate = await models.post.create({
    UserId: req.body.UserId, //req.userId //
    title:req.body.title,
    content:req.body.content,
    attachment: req.body.attachment
  })
    return res.status(200).json ({ _postcreate});
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
    return res.status (200).json ({ _postget});
  }

  catch (err) {
    return res.status(500).json ( err); 
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
      return res.status(200).json({ _postget});
  }

  catch(err){
    return res.status(500).json ({ err});
  } 

}
  
exports.deletePost = async (req,res,next) => {
   
  try {
    let _postdeleete= await models.post.destroy({
    where: { id: Number(req.params.id) }
    });
    
    return res.status(200).json({ _postdeleete}); 
  }

  catch(err){
    return res.status(500).json ({ err});
  }
    
}  

