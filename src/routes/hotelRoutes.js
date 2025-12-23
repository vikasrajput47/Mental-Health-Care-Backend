import express from "express";
import {
  getHotels,
  postHotel,
  putHotel,
  removeHotel,
} from "../controllers/hotelController.js";
import { upload } from "../utils/cloudinary.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.use(authMiddleware())
router.get("/get", getHotels);
router.post("/add", upload.single("image"), postHotel);
router.put("/:id", upload.single("image"), putHotel);
router.delete("/:id", removeHotel);

export default router;
