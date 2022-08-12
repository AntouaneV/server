import mongoose from 'mongoose';
import Order from '../models/Order.js';

export const addOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({
      ...req.body,
    });

    await newOrder.save();
    res.status(200).send('Order has been created!');
  } catch (error) {
    next(error);
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted.');
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const getdOrder = await Order.find({
      customer_id: { $eq: req.params.id },
    });
    res.status(200).json(getdOrder);
  } catch {
    next(error);
  }
};
