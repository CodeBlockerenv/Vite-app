import express from 'express';
import {sendMessage,getMessages} from '../controller/message.controller.js';
import verifyJWToken from '../utils/verifyJWToken.js';
import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(dirname(fileURLToPath(import.meta.url)), '..');


const storage =multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'public/images'))
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+ path.extname(file.originalname))
    }
})

const upload =multer({
    storage:storage
});

try {
    router.post('/send/:id', upload.single('file'), verifyJWToken, sendMessage);
} catch (error) {
    console.error('Multer Error:', error);
    // Handle the error as needed
}
router.get('/:id',verifyJWToken,getMessages);


export default router;