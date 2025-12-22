import User from "../models/user.js";
import TherapistProfile from "../models/therapistProfile.js";
const getAllTherapists = async () => {
  // Finds all users where role is exactly "THERAPIST"
  // Excludes passwords and sensitive internal data
  const therapists = await User.find({ role: "THERAPIST" })
    .select("name email phone role createdAt")
    .sort({ name: 1 }); // Sort alphabetically

  return therapists;
};
const getProfile = async (userId) => {
  // Finds all users where role is exactly "THERAPIST"
  // Excludes passwords and sensitive internal data
  const profile = await User.find({_id:userId})

  return profile;
};


 const updateProfileData = async (userId, updateFields) => {
  // 1. Separate User fields from Profile fields
  const userFields = ["name", "avatar", "age", "gender", "address", "phone"];
  const profileFields = [
    "licenseNumber",
    "specializations",
    "experienceYears",
    "bio",
    "hourlyRate",
  ];

  const userData = {};
  const profileData = {};

  Object.keys(updateFields).forEach((key) => {
    if (userFields.includes(key)) userData[key] = updateFields[key];
    if (profileFields.includes(key)) profileData[key] = updateFields[key];
  });

  // 2. Update the User table
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: userData },
    { new: true, runValidators: true }
  ).select("-passwordHash");

  // 3. If User is a THERAPIST, update/create their TherapistProfile
  if (updatedUser.role === "THERAPIST") {
    await TherapistProfile.findOneAndUpdate(
      { userId },
      { $set: profileData },
      { upsert: true, new: true }
    );
  }

  return updatedUser;
};
export default { getAllTherapists,updateProfileData,getProfile };
