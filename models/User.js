import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
      required: true,
      default: ['user'],
    },
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    zipcode: {
      type: Number,
      default: '',
    },
    civility: {
      type: String,
      default: '',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
