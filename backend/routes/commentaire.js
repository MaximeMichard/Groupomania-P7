const express= require ('express');
const router= express.Router();

const ctrlCommentaire= require ('../controllers/commentaire');
const auth= require ('../middleware/auth');
const multer= require ('../middleware/multer-config');

router.post ("/",ctrlCommentaire.createCommentaire);
router.get ("/:id",auth,ctrlCommentaire.getCommentaire);
router.put("/:id",auth,ctrlCommentaire.updateCommentaire);
router.delete("/:id",auth,ctrlCommentaire.deleteCommentaire);

module.exports = router;