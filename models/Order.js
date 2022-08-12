import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema(
  {
    trackingID: {
      type: String,
      required: true,
    },
    product: {
      type: Array,
      required: true,
    },
    productImg: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    customer_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Default',
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
