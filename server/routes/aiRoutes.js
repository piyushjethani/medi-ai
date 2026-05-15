import express from 'express';
import { processChat, getChatHistory } from '../controllers/aiController.js';

const router = express.Router();

router.post('/', processChat);
router.get('/:sessionId', getChatHistory);

export default router;
