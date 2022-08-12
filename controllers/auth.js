import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'User not found!'));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, 'Wrong credentials!'));

    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT
    );
    const { password, ...others } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const forgotpassword = async (req, res, next) => {
  try {
    const forgotPasswordEmail = await User.findOne({
      email: req.body.email,
    });
    if (!forgotPasswordEmail) return next(createError(404, 'Email not found!'));

    const date_ob = new Date();
    const token = jwt.sign(
      {
        email: req.body.email,
        id: forgotPasswordEmail._id,
        date: date_ob.getDate(),
      },
      process.env.JWT,
      {
        expiresIn: '15m',
      }
    );

    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

export const verify_resetpassword = async (req, res, next) => {
  try {
    jwt.verify(req.params.token, process.env.JWT, (err, token) => {
      if (err) {
        return next(createError(403, 'Token not found!'));
      }
      res.status(200).send(token);
    });
  } catch (error) {
    next(error);
  }
};

export const resetpassword = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        password: hash,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
