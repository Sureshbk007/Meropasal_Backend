import { Schema, model } from "mongoose";
import generateSlug from "../utils/generateSlug.js";

// Review Schema
const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    image: [
      {
        publicId: String,
        imageUrl: String,
      },
    ],
  },
  { timestamps: true }
);

// Variant Schema
const variantSchema = new Schema({
  color: String,
  size: String,
  price: {
    type: Number,
    required: true,
  },
  crossPrice: Number,
  images: [
    {
      publicId: String,
      imageUrl: String,
    },
  ],
});

//Product Schema
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    details: {
      type: String,
      required: true,
    },
    ratings: {
      type: [reviewSchema],
      default: [],
    },
    variants: [variantSchema],
  },
  { timestamps: true }
);

// Generate slug before creating/modifying product
productSchema.pre("save", async function (next) {
  if (this.isModified("title")) this.slug = generateSlug(this.title);
  next();
});

export const Product = model("Product", productSchema);
