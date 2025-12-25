import express from "express";
const router = express.Router();
import {
  createBooking,
  getMyBookings,
  getBookingDetails,
  cancelBooking,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
// All routes below require the user to be logged in
router.use(authMiddleware());

router.post("/create", createBooking);
router.get("/list", getMyBookings);
router.get("/:id", getBookingDetails);
router.put("/cancel/:id", cancelBooking);

export default router;
