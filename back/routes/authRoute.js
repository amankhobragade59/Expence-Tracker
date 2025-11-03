import express from 'express'
import {getAuthUser,logoutUser} from '../controller/userConroller.js'
 const router = express.Router();

 router.post('/user',getAuthUser);
 router.post('/logout',logoutUser);

 export default router;