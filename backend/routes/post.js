const express = require("express"); //importation framework Express //
const router = express.Router(); //Importation du router Express //

const postCtrl = require("../controllers/post"); 
const auth = require("../middleware/auth"); // Token, authorisation // 
const multer = require("../middleware/multer-config"); //Importation de multer, Gére les fichiers entrant //


router.post("/",auth,postCtrl.createPost);
router.get("/:id",auth,postCtrl.getPost);
router.put("/:id",auth,postCtrl.updatePost);
router.delete("/:id",auth,postCtrl.deletePost);


module.exports = router;
