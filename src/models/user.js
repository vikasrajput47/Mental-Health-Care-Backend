import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    passwordHash: { type: String },
    name:{type:String},
    role: {
      type: String,
      enum: ["USER", "THERAPIST", "ADMIN"],
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },

    lastLoginAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);


