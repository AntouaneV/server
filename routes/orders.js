import express from 'express';
import {
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
} from '../controllers/order.js';

const router = express.Router();

router.post('/', addOrder);
router.get('/', getOrder);
router.put('/:id', updateOrder);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrder);

export default router;
