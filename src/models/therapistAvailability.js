import mongoose from "mongoose";
const TherapistAvailabilitySchema = new mongoose.Schema(
  {
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TherapistProfile",
      index: true,
    },

    dayOfWeek: {
      type: Number, // 0–6 (Sun–Sat)
      min: 0,
      max: 6,
    },

    startTime: String, // "09:00"
    endTime: String, // "17:00"
    timezone: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "TherapistAvailability",
  TherapistAvailabilitySchema
);
