import mongoose from "mongoose";
import generateSlug from "../utils/generateSlug.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: String,
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    crossedPrice: Number,
    purchasedPrice: Number,
    isSale: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        publicId: { type: String, required: true },
        imageUrl: { type: String, required: true },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    sizes: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Generate slug before creating/modifying product
productSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    try {
      this.slug = generateSlug(this.title);
    } catch (error) {
      return next(error); // Handle errors in slug generation
    }
  }
  next();
});

export const Product = mongoose.model("Product", productSchema);
