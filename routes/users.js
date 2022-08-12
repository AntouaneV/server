import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.put('/:id', verifyToken, updateUser);

router.delete('/:id', verifyToken, deleteUser);

router.get('/find/:id', getUser);

router.get('/', getAllUsers);

export default router;
