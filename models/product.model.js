import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    crossPrice: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trime: true,
    },
    image: [
      {
        publicId: String,
        imageUrl: String,
      },
    ],
    size: [],
    color: [],
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
