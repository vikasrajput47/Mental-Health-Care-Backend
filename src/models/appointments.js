import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    // Reference to the Patient (User)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reference to the Therapist
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TherapistProfile",
      required: true,
    },
    // Date and Time of the session
    scheduledDate: {
      type: Date,
      required: true,
    },
    // Session details
    duration: {
      type: Number,
      default: 60, // duration in minutes
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["video", "audio", "chat", "in-person"],
      default: "video",
    },
    // For online sessions
    meetingLink: {
      type: String,
      trim: true,
    },
    // Billing/Fees
    fee: {
      amount: Number,
      currency: { type: String, default: "USD" },
      isPaid: { type: Boolean, default: false },
    },
    // Private notes (usually restricted to the therapist)
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

// Indexing for faster lookups (get all appointments for a specific user/therapist)
AppointmentSchema.index({ userId: 1, scheduledDate: 1 });
AppointmentSchema.index({ therapistId: 1, scheduledDate: 1 });


const appointmentModel = mongoose.model("Appointment", AppointmentSchema);
export default appointmentModel;
