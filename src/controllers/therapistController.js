import therapistService from "../services/therapistService.js";

export const upsertTherapist = async (req, res) => {
  try {
    const userId = req.user.id; // From your 'protect' middleware
    const profileData = req.body;

    const profile = await therapistService.upsertTherapistProfile(
      userId,
      profileData
    );

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


