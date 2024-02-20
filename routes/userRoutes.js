const express = require('express');
const {registerController,loginController,authController} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//register 
router.post('/register',registerController);

//login
router.post('/login',loginController);

//getUserData
router.post('/getUserData',authMiddleware,authController);


module.exports = router;