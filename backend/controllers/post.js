const models= require ('../models');
const { post } = require('../app');

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
 exports.updatePost = (req,res,next) => {
    models.post.findOne({
      where: { id: Number(req.params.id) } 
    })
    .then(() => {
      models.post.update(
        { title:req.body.title },
        {content: req.body.content},
        {attachment:req.body.attachment},
        {where: { id: Number(req.params.id) } }
        )
      .then((post)=> res.status(200).json({ post}))
      .catch((error) => res.status(404).json({ error}))
    })
    .catch((error) => res.status(404).json({ error}))
}
/*
exports.deletePost = (req,res,next) => {
    
}  */
