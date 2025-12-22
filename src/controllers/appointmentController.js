import * as appointmentService from "../services/appointmentService.js";

export const createAppointment = async (req, res) => {
    try {
      console.log("the appint here called==>>")
    const { therapistId, scheduledDate, type,amount } = req.body;
    const data = await appointmentService.createNewBooking(
      req.user.id,
      therapistId,
      scheduledDate,
        type,
      amount,
    );
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const data = await appointmentService.fetchUserBookings(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const data = await appointmentService.rescheduleBooking(
      req.user.id,
      req.params.id,
      req.body.scheduledDate
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    await appointmentService.softDeleteBooking(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
