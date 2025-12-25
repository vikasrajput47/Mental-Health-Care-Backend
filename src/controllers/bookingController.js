import * as bookingService from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  try {
    // userId is extracted from JWT by auth middleware
    const booking = await bookingService.createBookingService({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getMyBookingsService(req.user.id);
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const booking = await bookingService.getBookingByIdService(
      req.params.id,
      req.user.id
    );
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingService.cancelBookingService(
      req.params.id,
      req.user.id
    );
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res
      .status(200)
      .json({
        success: true,
        message: "Booking cancelled successfully",
        data: booking,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
