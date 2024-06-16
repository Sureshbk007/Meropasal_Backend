import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    crossPrice: {
      type: Number,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    image: [
      {
        publicId: String,
        imageUrl: String,
      },
    ],
    size: [String],
    color: [String],
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
