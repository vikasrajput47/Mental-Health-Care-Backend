import mongoose from "mongoose";
const JournalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },

    content: { type: String, required: true },

    mood: {
      type: String,
      enum: ["HAPPY", "NEUTRAL", "SAD", "ANXIOUS"],
    },

    deletedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Journal", JournalSchema);
