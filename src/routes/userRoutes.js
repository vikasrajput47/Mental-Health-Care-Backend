import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getTherapistList } from "../controllers/userController.js";
import { upsertTherapist } from "../controllers/therapistController.js";
// Endpoint: GET /api/users/therapists
const router = express.Router();

router.use(authMiddleware());
router.get("/therapists", getTherapistList);
router.post("/therapist", upsertTherapist);

export default router;
