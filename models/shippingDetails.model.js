import mongoose from "mongoose";

const shippingDetailsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipientName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: String,
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    landmark: String,
  },
  { timestamps: true }
);

export const ShippingDetails = mongoose.model(
  "ShippingDetails",
  shippingDetailsSchema
);
