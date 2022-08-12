import express from 'express';
import {
  addProduct,
  getFamousProduct,
  getSimilarProduct,
  updateProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
} from '../controllers/product.js';
import { verifyToken } from '../verifyToken.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('imgUrl');

const router = express.Router();

router.post('/add', upload, addProduct);
router.delete('/:id', verifyToken, deleteProduct);
router.get('/famous', getFamousProduct);
router.get('/searchTag/:id', getSimilarProduct);
router.get('/:id', getProduct);
router.put('/:id', verifyToken, updateProduct);
router.get('/', getAllProduct);

export default router;
