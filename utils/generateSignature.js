import crypto from "crypto";
//Signature Generator for esewa
const generateSignature = (message) => {
  const hmac = crypto.createHmac("sha256", process.env.ESEWA_SECRET_KEY);
  hmac.update(message);
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

export default generateSignature;
