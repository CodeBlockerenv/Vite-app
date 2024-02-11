import express from 'express';
import { getUsersSidebar } from '../controller/user.controller.js';
import verifyJWToken from '../utils/verifyJWToken.js';



const router = express.Router();


router.get('/',verifyJWToken,getUsersSidebar);



export default router;