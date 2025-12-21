import mongoose from "mongoose";
const UserSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    refreshTokenHash: { type: String, required: true },

    deviceInfo: String,
    ipAddress: String,

    expiresAt: { type: Date, index: true },
    revokedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("UserSession", UserSessionSchema);
