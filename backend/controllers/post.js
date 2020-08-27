const models= require ('../models');

exports.createPost = (req,res,next) => {
   models.post.create({
       title:req.body.title,
       content:req.body.content,
       attachment: req.body.attachment
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
  const newTitle = req.body.newTitle;
  const newContent= req.body.newContent;
  const newAttachment= req.body.newAttachment;
  
  await models.post.update({ title: newTitle, content: newContent,attachment:newAttachment }, {
    where: {
      id: Number(req.params.id)
    }
  });
  return res.status(200).json({ newTitle,newContent,newAttachment});
}

exports.deletePost = (req,res,next) => {
  if(req.params.id != null){
    models.post.findOne({ //On cherche si l'utilisateur exite ou pas //
 where: { id: Number(req.params.id) }
 })
 .then(() => {
     models.post.destroy({ // Supprimer le fichier de la BDD//
         where: { id: Number(req.params.id) }
       })
       .then(() => res.status(200).json({
         message: "Post supprimé!"
       }))
       .catch((error) => res.status(400).json({
         error
       }));
 })
 .catch(() => res.status(500).json({
   error: "L'utilisateur n'existe pas !"
 })); 
 }  
 else {
     res.status(500).json({ error: "L'utilisateur n'existe pas !"})
 }
}  
