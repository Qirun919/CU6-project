const SavedJobs = require("../models/savedJobs");

// save a job for a user
const savedJobs = async (userId, jobId) => {
  const newSavedJobs = new SavedJobs({
    user: userId,
    job: jobId,
  });
  await newSavedJobs.save();
  return newSavedJobs;
};

// get all saved jobs for a user

const getSavedJobs = async (userId) => {
  return await SavedJobs.find({ user: userId })
    .populate("job") // 👈 this line is the key
    .sort({ createdAt: -1 }); // optional, newest first
};

// delete a saved job by id
const deleteSavedJob = async (id) => {
  return await SavedJobs.findByIdAndDelete(id);
};

module.exports = {
  savedJobs,
  getSavedJobs,
  deleteSavedJob,
};
