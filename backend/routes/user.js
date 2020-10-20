const express= require ('express'); // Utilisation framework basé sur node.JS //
const router= express.Router(); 
const userCtrl= require ('../controllers/user');
const auth = require ('../middleware/auth');
const expressBouncer= require ("express-bouncer")(5000,600000,3); // Contre les attaques de force Brute // 

router.post('/signup', userCtrl.signup);
router.post('/login',expressBouncer.block, userCtrl.login);
router.get('/users/:id',auth,userCtrl.getUserProfile);
router.put('/users/:id',auth, userCtrl.updatePwd);
router.delete('/users/:id',auth,userCtrl.delete);

module.exports= router; 