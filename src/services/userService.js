import User from "../models/user.js";

const getAllTherapists = async () => {
  // Finds all users where role is exactly "THERAPIST"
  // Excludes passwords and sensitive internal data
  const therapists = await User.find({ role: "THERAPIST" })
    .select("name email phone role createdAt")
    .sort({ name: 1 }); // Sort alphabetically

  return therapists;
};

export default { getAllTherapists };
