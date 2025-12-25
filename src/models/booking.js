import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  // REFERENCES
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },

  // TRANSACTION DETAILS
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed",
  },
  adult: { type: Number },
  child:{type:Number},
  bookingReference: {
    type: String,
    unique: true,
    default: () => Math.random().toString(36).substring(7).toUpperCase(),
  },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking