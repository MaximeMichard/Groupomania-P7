const models= require ('../models');

exports.createPost = (req,res,next) => {
    const postObject=JSON.parse(req.body.post)
    const post= new post({
        ...postObject,
        imag
    })
}
exports.getPost = (req,res,next) => {
    
}
exports.updatePost = (req,res,next) => {
    
}
exports.deletePost = (req,res,next) => {
    
}
