import * as JournalService from "../services/journal.js"

export const createEntry = async (req, res) => {
  try {
    const journal = await JournalService.createJournal(req.user.id, req.body);
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const journals = await JournalService.getJournalsByUser(req.user.id);
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const updated = await JournalService.updateJournal(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!updated) return res.status(404).json({ message: "Journal not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
    try {
    const deleted = await JournalService.softDeleteJournal(
      req.params.id,
      req.user.id
    );
    if (!deleted) return res.status(404).json({ message: "Journal not found" });
    res.status(200).json({ message: "Journal moved to trash" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleEntry = async (req, res) => {
  try {
    const journal = await JournalService.getJournalById(
      req.params.id,
      req.user.id
    );

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};