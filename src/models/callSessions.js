import mongoose from "mongoose";
const CallSessionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      index: true,
    },

    providerCallId: String,

    callType: {
      type: String,
      enum: ["AI", "THERAPIST"],
    },

    startedAt: Date,
    endedAt: Date,
    duration: Number,

    status: {
      type: String,
      enum: ["STARTED", "ENDED", "FAILED"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CallSession", CallSessionSchema);
