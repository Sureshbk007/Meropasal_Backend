import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateSignature from "../utils/generateSignature.js";

const esewaCheckIntegrity = asyncHandler(async (req, res, next) => {
  const { data } = req.query;
  const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  if (decodedData.status !== "COMPLETE") {
    await Order.findOneAndDelete({ orderId: decodeURI.transaction_uuid });
    res.redirect("http://localhost:5173/checkout?order=failed");
  }
  const message = decodedData.signed_field_names
    .split(",")
    .map((field) => `${field}=${decodedData[field]}`)
    .join(",");

  const signature = generateSignature(message);
  if (signature !== decodedData.signature) {
    await Order.findOneAndDelete({ orderId: decodeURI.transaction_uuid });
    res.redirect("http://localhost:5173/checkout?order=failed");
  }
  req.orderId = decodedData.transaction_uuid;
  req.paymentId = decodedData.transaction_code;
  next();
});

export { esewaCheckIntegrity };
