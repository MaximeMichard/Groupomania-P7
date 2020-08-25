const express = require("express"); //importation framework Express //
const router = express.Router(); //Importation du router Express //

const postCtrl = require("../controllers/post"); 
const auth = require("../middleware/auth"); // Token, authorisation // 
const multer = require("../middleware/multer-config"); //Importation de multer, Gére les fichiers entrant //


router.get("/", auth,postCtrl.createPost);
router.get("/:id", auth,postCtrl.getPost);
router.post("/", auth, multer,postCtrl.updatePost);
router.put("/:id", auth, multer,postCtrl.deletePost);
router.delete("/:id", auth,postCtrl.deleteSauce);


module.exports = router;
