const models= require ('../models');

exports.createPost = (req,res,next) => {
   models.post.create({
       title:req.body.title,
       content:req.body.content,
       attachment: req.body.attachment,
       userId: req.userId
   })
   .then(newPost => res.status(201).json({ newPost}))
   .catch(err => { res.status(500).json({err})})
}

exports.getPost = (req,res,next) => {
  models.post.findOne({
    where: { id: Number(req.params.id) } 
})
.then((post) => res.status(200).json(post))
.catch((error) => res.status(404).json({
  error
}));
}

 exports.updatePost = async (req,res,next) => {
  const newPost= req.body;
  const newTitle = req.body.newTitle;
  const newContent= req.body.newContent;
  const newAttachment= req.body.newAttachment;
  console.log('Dans le controller ! ');
  console.log(req.userId);
  
  await models.post.update({ 
    title: newTitle, 
    content: newContent,
    attachment:newAttachment 
  },{
    where: {
      id: Number(req.params.id)
    }
  });
  return res.status(200).json({ newPost });
}

exports.deletePost = async (req,res,next) => {
    
  let resultat= await models.post.destroy({
    where: {
     id: Number(req.params.id)
    }
  });
  return res.status(200).json({ message: "Element supprimé ! "}); 
    
}  

