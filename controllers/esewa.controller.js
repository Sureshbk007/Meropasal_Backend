import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const esewaSuccess = asyncHandler(async (req, res) => {
  const orderId = req.orderId;
  const paymentId = req.paymentId;
  const order = await Order.findOne({ orderId });
  order.payment.paymentId = paymentId;
  order.payment.paymentStatus = "PAID";
  await order.save();
  res.redirect("http://localhost:5173/checkout?order=success");
});

const esewaFailure = asyncHandler(async (req, res) => {
  const { orderId } = req.query;
  await Order.findOneAndDelete({ orderId });
  res.redirect("http://localhost:5173/checkout?order=failed");
});

export { esewaSuccess, esewaFailure };
