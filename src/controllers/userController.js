import userService from "../services/userService.js";

export const getTherapistList = async (req, res) => {
  try {
    const therapists = await userService.getAllTherapists();

    res.status(200).json({
      success: true,
      count: therapists.length,
      data: therapists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not retrieve therapists",
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    // req.user.id comes from your protect middleware
    const updatedUser = await userService.updateProfileData(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};