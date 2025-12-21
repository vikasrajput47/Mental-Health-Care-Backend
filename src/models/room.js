const RoomMediaSchema = new mongoose.Schema(
  {
    title: String,

    type: {
      type: String,
      enum: ["IMAGE", "VIDEO"],
    },

    url: String,
    tags: [String],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("RoomMedia", RoomMediaSchema);
