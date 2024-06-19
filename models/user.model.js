import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      imageUrl: String,
      publicId: String,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  try {
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (plaintextPassword) {
  return bcrypt.compareSync(plaintextPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.AUTH_TOKEN, {
    expiresIn: "10d",
  });
  return token;
};

export const User = mongoose.model("User", userSchema);
