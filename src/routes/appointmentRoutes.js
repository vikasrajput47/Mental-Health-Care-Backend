import express from "express";
import {
  createAppointment,
  getMyBookings,
  updateBooking,
  cancelBooking,
} from "../controllers/appointmentController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.use(authMiddleware()); 

router.post("/user", createAppointment);
router.get("/user/my-bookings", getMyBookings);
router.put("/user/:id", updateBooking);
router.delete("/user/:id", cancelBooking);

export default router;
