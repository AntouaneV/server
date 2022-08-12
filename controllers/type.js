import Type from '../models/Type.js';
import { createError } from '../error.js';

export const addType = async (req, res, next) => {
  const getRoles = req.user.roles;
  if (getRoles.includes('admin')) {
    try {
      const newType = new Type({ name: req.body.name });
      await newType.save();
      res.status(200).send('Type has been created!');
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can't add new type!"));
  }
};

export const deleteType = async (req, res, next) => {
  const getRoles = req.user.roles;
  if (getRoles.includes('admin')) {
    try {
      await Type.findByIdAndDelete(req.params.id);
      res.status(200).json('Type has been deleted.');
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can't delete type!"));
  }
};

export const getType = async (req, res, next) => {
  try {
    const type = await Type.findById(req.params.id);

    res.status(200).json(type);
  } catch (error) {
    next(error);
  }
};
