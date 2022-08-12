import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'Type',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Array,
    },
    imgUrl: {
      data: Buffer,
      contentType: String,
    },
    price: {
      type: Number,
      required: true,
    },
    searchTag: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Type',
        },
      ],
    },
    countryDestination: {
      type: String,
      required: true,
    },
    travelDate: {
      type: Date,
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
