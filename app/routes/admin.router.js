import express from 'express';
// import {getAdmin} from '../controllers/admin.controler.js'
import getusersHandler from '../controllers/getusersHandler.controller.js';
import { deleteUserHandler } from '../controllers/DeleteUserHandler.js';
import { upload } from './../middlewares/multer.middleware.js';
import { addUserHandler } from '../controllers/addUserHandler.js';
import { addProductHandler } from '../controllers/addProductHandler.js';
import userAuth from '../middlewares/userAuth.middleware.js'
import getProductsHandler from './../controllers/getProductsHandler.controller.js';
import { deleteProductHandler } from './../controllers/deleteProductHandler.js';
import { getGenerateTextHandler } from '../controllers/getGenerateTextHandler.js';
import { updateUserHandler } from '../controllers/updateUserHandler.js';

const router = express.Router();
router.get('/users',getusersHandler);
router.get('/products',getProductsHandler);
router.post('/products/imagetotext',upload.single('file'),getGenerateTextHandler);
router.get('/products/:id',getProductsHandler);
router.delete('/products/delete/:id',userAuth.authenticate,deleteProductHandler);
router.post('/products/add',upload.single('file'),userAuth.authenticate,addProductHandler);
router.delete('/users/delete/:userId',deleteUserHandler);
router.post('/users/add/',upload.single('file'),addUserHandler);
router.post('/users/edit/',upload.single('file'),updateUserHandler);

export default router;