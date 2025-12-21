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


