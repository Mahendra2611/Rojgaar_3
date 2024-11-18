import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    otp: String,
    userId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 15 * 60 * 1000) }
},{timestamps:true});

// Create a TTL index on the expiresAt field
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP = mongoose.model("OTP", OTPSchema);