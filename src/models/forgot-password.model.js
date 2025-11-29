const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
      require: true,
    },
    expireAt: {
      type: Date,
      index: { expires: 180 },
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot-password"
);
