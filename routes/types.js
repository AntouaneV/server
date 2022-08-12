import express from 'express';
import { addType, deleteType, getType } from '../controllers/type.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken, addType);
router.delete('/delete/:id', verifyToken, deleteType);
router.get('/:id', getType);

export default router;
