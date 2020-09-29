const express = require("express"); //importation framework Express //
const router = express.Router(); //Importation du router Express //

const postCtrl = require("../controllers/post"); 
const auth = require("../middleware/auth"); // Token, authorisation // 
const multer = require("../middleware/multer-config"); //Importation de multer, Gére les fichiers entrant //


router.post("/",auth,multer,postCtrl.createPost);
router.get("/",auth,postCtrl.allPost);
router.get("/:id",auth,postCtrl.getPost);
router.get("/:id/commentaire",auth,postCtrl.getPostCommentaire);
router.put("/:id",auth,multer,postCtrl.updatePost);
router.delete("/:id",auth,postCtrl.deletePost);


module.exports = router;
