import { Router } from 'express';
const router = Router();
import { sendMessages } from '../controllers/messageController';
import auth from '../middleware/auth';

router.post('/send', auth, sendMessages);

export default router;
