import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // Array of URLs
  pricePerNight: { type: Number, required: true },
  amenities: [{ type: String }], // e.g., ['Pool', 'Spa', 'Wifi']

  // AVAILABILITY LOGIC
  totalRooms: { type: Number, default: 1 },
  roomsBooked: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  capacity:{type:Number,dafault:5},
  // Metadata
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now },
});

// Middleware to automatically mark as unavailable if rooms are full
HotelSchema.pre("save", function (next) {
  if (this.roomsBooked >= this.totalRooms) {
    this.isAvailable = false;
  } else {
    this.isAvailable = true;
  }
  next();
});

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel
