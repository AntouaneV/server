import express from 'express';
import {
  signin,
  signup,
  forgotpassword,
  verify_resetpassword,
  resetpassword,
} from '../controllers/auth.js';

const router = express.Router();

//CREATE USER
router.post('/signup', signup);
//SIGN IN
router.post('/signin', signin);
//FORGOT PASSWORD
router.post('/forgotpassword', forgotpassword);
//REST PASSWORD LINK
router.get('/resetpassword/:token', verify_resetpassword);
//RESET PASSWORD
router.post('/resetpassword/', resetpassword);

export default router;
