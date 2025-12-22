import Appointment from "../models/appointments.js";
import therapistProfile from "../models/therapistProfile.js";
import user from "../models/user.js";
import mongoose from "mongoose";
export const createNewBooking = async (
  userId,
  therapistId,
  scheduledDate,
  type,
  amount
) => {
  // Check for conflicts
  const isBusy = await Appointment.findOne({
    therapistId,
    scheduledDate,
    status: { $ne: "cancelled" },
  });

  if (isBusy) throw new Error("This time slot is already taken");

  return await Appointment.create({
    userId,
    therapistId,
    scheduledDate,
    type,
    fee: { amount },
  });
};

export const fetchUserBookings = async (userId) => {
  return await Appointment.aggregate([
    // 1. Find only this user's appointments
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },

    // 2. Merge with TherapistProfile table
    {
      $lookup: {
        from: "therapistprofiles", // The actual name of the collection in MongoDB
        localField: "therapistId", // Field in Appointment
        foreignField: "_id", // Field in TherapistProfile
        as: "profileInfo", // Temporary name for the merged data
      },
    },
    { $unwind: "$profileInfo" }, // Convert array to object

    // 3. Merge with Users table (to get therapist's name/avatar)
    {
      $lookup: {
        from: "users", // The User collection
        localField: "profileInfo.userId",
        foreignField: "_id",
        as: "therapistDetails",
      },
    },
    { $unwind: "$therapistDetails" },

    // 4. Shape the final return data (Return only what you need)
    {
      $project: {
        _id: 1,
        scheduledDate: 1,
        status: 1,
        duration: 1,
        fee: 1,
        type: 1,
        therapistName: "$therapistDetails.name",
        therapistAvatar: "$therapistDetails.avatar",
        specializations: "$profileInfo.specializations",
        hourlyRate: "$profileInfo.hourlyRate",
      },
    },

    // 5. Sort by date
    { $sort: { scheduledDate: 1 } },
  ]);
};
export const rescheduleBooking = async (userId, appointmentId, newDate) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: appointmentId, userId },
    { scheduledDate: newDate },
    { new: true, runValidators: true }
  );
  if (!appointment) throw new Error("Appointment not found or unauthorized");
  return appointment;
};

export const softDeleteBooking = async (userId, appointmentId) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: appointmentId, userId },
    { status: "cancelled" },
    { new: true }
  );
  if (!appointment) throw new Error("Appointment not found or unauthorized");
  return appointment;
};
