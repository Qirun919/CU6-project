const Contact = require("../models/contact");

// get contact message for a user
const getContactByUser = async (userId) => {
  // find all contact messages by userId
  return await Contact.find({ user: userId })
    .sort({ dateApplied: -1 }) // latest first
    .populate("job", "title");
};

// get contact message for a job to employer
const getConatctByaJob = async (jobId, employerId) => {
  // only employer who owns the job can see
  return await Contact.find({ job: jobId })
    .populate("user")
    .sort({ dateApplied: -1 })
    .populate("job", "title");
};

// add a new contact message by user
const addContact = async (userId, jobId, message, resume) => {
  const newContact = new Contact({
    user: userId,
    job: jobId,
    message,
    resume,
  });
  await newContact.save();
  return newContact;
};

// delete a contact message by id
const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

// update status of contact message by id
const updateContact = async (id, status) => {
  return await Contact.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = {
  getContactByUser,
  getConatctByaJob,
  addContact,
  deleteContact,
  updateContact,
};
