import express from "express";
import * as JournalController from "../controllers/journal.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// All journal routes require authentication
router.use(authMiddleware());

router.post("/", JournalController.createEntry);
router.get("/", JournalController.getAllEntries);
router.put("/:id", JournalController.updateEntry);
router.delete("/:id", JournalController.deleteEntry);
router.get("/:id", JournalController.getSingleEntry);
export default router;
