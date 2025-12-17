import express from 'express';
import getusersHandler from '../controllers/getusersHandler.controller.js';
import userAuth from '../middlewares/userAuth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = express.Router();

router.get('/',userAuth.authenticate,getusersHandler)
// router.post('/upload',uploadFile)
router.post('/signup',upload.single('file'), userAuth.signup,userAuth.login)
router.post('/login',userAuth.login)
router.post('/authenticate',userAuth.authenticate)

export default router;