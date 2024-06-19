import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();


router.post('/signup', userController.createUser);

router.post('/signin', userController.loginUser);

export default router;
