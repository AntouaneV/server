import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Type from '../models/Type.js';

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      ...req.body,
      imgUrl: {
        data: req.file.filename,
        contentType: req.file.filename,
      },
    });

    await newProduct.save();
    res.status(200).send('Product has been created!');
  } catch (error) {
    next(error);
  }
};
export const getFamousProduct = async (req, res, next) => {
  try {
    const products = await Product.find({
      searchTag: {
        $eq: [
          mongoose.Types.ObjectId('62d519c8eb2bbc421ab86216'),
          mongoose.Types.ObjectId('62d51357a9e48d2532206ce7'),
          mongoose.Types.ObjectId('62d5135ba9e48d2532206ce9'),
        ],
      },
    });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const getSimilarProduct = async (req, res, next) => {
  try {
    const products = await Product.find({
      searchTag: {
        $in: [mongoose.Types.ObjectId(req.params.id)],
      },
    });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const getRoles = req.user.roles;
  if (getRoles.includes('admin')) {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateProduct);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can't modify product!"));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted.');
  } catch (error) {
    next(error);
  }
};
