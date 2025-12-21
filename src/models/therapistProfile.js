import mongoose from "mongoose";
const TherapistProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },

    licenseNumber: String,
    specializations: [String],
    experienceYears: Number,

    bio: String,
    hourlyRate: Number,

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("TherapistProfile", TherapistProfileSchema);
