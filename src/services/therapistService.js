import therapistProfile from "../models/therapistProfile.js";

const upsertTherapistProfile = async (userId, profileData) => {
  // findOneAndUpdate handles the "Create if not exists" logic
  const profile = await therapistProfile.findOneAndUpdate(
    { userId: userId }, // Look for profile belonging to this user
    { $set: profileData }, // Update with new data
    {
      new: true, // Return the updated document
      upsert: true, // Create it if it doesn't exist
      runValidators: true, // Ensure the data matches the Schema
    }
  );

  return profile;
};

export default { upsertTherapistProfile };
