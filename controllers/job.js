const Job = require("../models/job");

/**
 * Get all jobs, optionally filtered by specialisation
 */
const getJobs = async (specialisation, page = 1, itemPerPage = 6) => {
  const filter = specialisation ? { specialisation } : {};

  return await Job.find(filter)
    .populate("specialisation")
    .limit(itemPerPage)
    .skip((page - 1) * itemPerPage)
    .sort({ _id: -1 }); // latest first
};

/**
 * Get a single job by ID
 */
const getJob = async (id) => {
  return await Job.findById(id).populate("specialisation");
};

/**
 * Add a new job
 */
const addJob = async (
  title,
  description,
  companyName,
  location,
  salary,
  role,
  specialisation,
  postedBy
) => {
  const newJob = new Job({
    title,
    description,
    companyName,
    location,
    salary,
    role,
    specialisation,
    postedBy, // ✅ keep user info
  });

  await newJob.save();
  return newJob;
};

/**
 * Update an existing job
 */
const updateJob = async (
  id,
  title,
  description,
  companyName,
  location,
  salary,
  role,
  specialisation,
  postedBy
) => {
  const updatedJob = await Job.findByIdAndUpdate(
    id,
    {
      title,
      description,
      companyName,
      location,
      salary,
      role,
      specialisation,
      postedBy,
    },
    { new: true }
  );

  return updatedJob;
};

/**
 * Delete a job by ID
 */
const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};

module.exports = {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob,
};
