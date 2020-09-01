const express= require ('express');
const router= express.Router();

const ctrlCommentaire= require ('../controllers/commentaire');
const auth= require ('../middleware/auth');
const multer= require ('../middleware/multer-config');

router.post ("/",ctrlCommentaire.createCommentaire);
router.get ("/:id",ctrlCommentaire.getCommentaire);
router.put("/:id",ctrlCommentaire.updateCommentaire);
router.delete("/:id",ctrlCommentaire.deleteCommentaire);

module.exports = router;