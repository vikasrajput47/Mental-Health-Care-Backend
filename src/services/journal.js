import Journal from "../models/journal.js";

export const createJournal = async (userId, data) => {
  return await Journal.create({ ...data, userId });
};

export const getJournalsByUser = async (userId) => {
  // Only fetch journals where deletedAt is null (Soft delete check)
  return await Journal.find({ userId, deletedAt: { $exists: false } }).sort({
    createdAt: -1,
  });
};

export const updateJournal = async (journalId, userId, updateData) => {
  return await Journal.findOneAndUpdate(
    { _id: journalId, userId },
    updateData,
    { new: true }
  );
};

export const softDeleteJournal = async (journalId, userId) => {
  return await Journal.findOneAndUpdate(
    { _id: journalId, userId },
    { deletedAt: new Date() },
    { new: true }
  );
};

export const getJournalById = async (journalId, userId) => {
  return await Journal.findOne({
    _id: journalId,
    userId: userId,
    deletedAt: { $exists: false },
  });
};