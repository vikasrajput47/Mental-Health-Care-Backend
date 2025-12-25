import Booking from "../models/booking.js";
import Hotel from "../models/hotel.js";

export const createBookingService = async (bookingData) => {
  const { hotelId, adult, child, checkIn, checkOut, userId } = bookingData;
  // 1. Find the hotel to get pricing and capacity
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) throw new Error("Hotel not found");

    // check if hotel is available or not
    if (!hotel.isAvailable) {
        throw new Error(
          'Hotel is already Booked!'
        );
    }
  // 2. Capacity Validation (Adult + Child <= Hotel Capacity)
  // Note: Ensure your Hotel model has a 'capacity' field, or we default to a value
  const totalGuests = Number(adult) + Number(child);
  const hotelMaxCapacity = hotel.capacity || 4; // Default to 4 if not defined

  if (totalGuests > hotelMaxCapacity) {
    throw new Error(
      `Capacity exceeded. This hotel only allows ${hotelMaxCapacity} guests.`
    );
  }

  // 3. Calculate Total Price
  const stayDuration = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );
  if (stayDuration <= 0)
    throw new Error("Check-out date must be after Check-in date");

  const totalPrice = stayDuration * hotel.pricePerNight;

  // 4. Create the booking
  const newBooking = new Booking({
      userId,
    hotelId,
    checkIn,
    checkOut,
    adult,
    child,
    totalPrice,
    status: "confirmed", // Directly confirmed since we skipped payment
});
await Hotel.findByIdAndUpdate({ _id: hotelId }, { isAvailable: false})
  return await newBooking.save();
};

export const getMyBookingsService = async (userId) => {
  return await Booking.find({ userId })
    .populate("hotelId")
    .sort({ createdAt: -1 });
};

export const getBookingByIdService = async (bookingId, userId) => {
  return await Booking.findOne({ _id: bookingId, userId }).populate("hotelId");
};

export const cancelBookingService = async (bookingId, userId) => {
  // 1. Find and update the booking status
  const updateInfo = await Booking.findOneAndUpdate(
    { _id: bookingId, userId },
    { status: "cancelled" },
    { new: true }
  );

  // 2. Safety Check: If no booking was found, don't try to update the hotel
  if (!updateInfo) {
    throw new Error(
      "Booking not found or you do not have permission to cancel it."
    );
  }

  // 3. Update the Hotel availability
  // We use updateInfo.hotelId which we get from the cancelled booking document
  await Hotel.findOneAndUpdate(
    { _id: updateInfo.hotelId },
    { isAvailable: true }
  );

  return updateInfo;
};
