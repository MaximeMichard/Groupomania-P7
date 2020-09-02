const express= require ('express');
const router= express.Router();

const mediaCtrl= require ('../controllers/media');
const auth= require ('../middleware/auth');
const multer= require ('../middleware/multer-config');

router.post('/',auth,mediaCtrl.createMedia);
router.get('/:id',auth,mediaCtrl.getMedia);
router.put('/:id',auth,multer,mediaCtrl.putMedia);
router.delete('/:id',auth,mediaCtrl.deleteMedia);


module.exports= router;