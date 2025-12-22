import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getTherapistList,updateProfile, getProfile } from "../controllers/userController.js";
import { upsertTherapist } from "../controllers/therapistController.js";

// Endpoint: GET /api/users/therapists
const router = express.Router();

router.use(authMiddleware());
router.get("/therapists", getTherapistList);
router.post("/therapist", upsertTherapist);
router.put("/", updateProfile);
router.get("/me", getProfile);
export default router;
