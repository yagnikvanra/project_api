import express from 'express';
import { Deletewether, Updatewether, createwether, getAllwether } from '../controller/wetherdataController.js';
import { verifyauthToken } from '../middleware/verifyUserToken.js';


const router = express.Router();

router.post('/create', verifyauthToken, createwether);
router.get('/all', verifyauthToken, getAllwether);
router.put('/update/:id', verifyauthToken, Updatewether);
router.delete('/delete/:id', verifyauthToken, Deletewether);

export default router;

       