import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import generateSignature from "../utils/generateSignature.js";

//To Generate the orderId/Transaction_uuid
const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase(); // Base36 for compactness
  const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `ORD-${timestamp}-${randomPart}`; // e.g., 'ORD-K4G7H8-1A2B'
};

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ isDeleted: false });
  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

const createOrder = asyncHandler(async (req, res) => {
  const { products, shippingDetails, paymentMethod } = req.body;
  const user = req.user.id;
  const netProductsAmount = products.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  //Addtional Fields
  const deliveryChargeAmount = 100;
  const taxAmount = 0;
  const serviceChargeAmount = 0;
  const totalAmount =
    netProductsAmount + deliveryChargeAmount + taxAmount + serviceChargeAmount;
  const orderId = generateOrderId();

  const order = await Order.create({
    orderId,
    user,
    products,
    totalAmount,
    status: "PENDING",
    shippingDetails,
    payment: {
      paymentMethod,
    },
  });

  if (paymentMethod === "COD") {
    if (!order) throw new ApiError(500, "Failed to create order");
    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order created Successfully"));
  }
  if (paymentMethod === "ESEWA") {
    const message = `total_amount=${totalAmount},transaction_uuid=${orderId},product_code=${process.env.ESEWA_MERCHANT_CODE}`;
    const signature = generateSignature(message);

    const formData = {
      amount: netProductsAmount,
      failure_url: `http://localhost:5000/api/v1/esewa/failure?orderId=${orderId}`,
      product_delivery_charge: deliveryChargeAmount,
      product_service_charge: serviceChargeAmount,
      product_code: process.env.ESEWA_MERCHANT_CODE,
      signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:5000/api/v1/esewa/success",
      tax_amount: taxAmount,
      total_amount: totalAmount,
      transaction_uuid: orderId,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, formData, "Api Response Success"));
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.find({ user: userId, isDeleted: false })
    .populate({ path: "products.productId", select: "title images slug -_id" })
    .select("-_id -user -isDeleted -updatedAt -__v")
    .sort({ createdAt: -1 });
  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

export { getAllOrders, createOrder, getUserOrders };
