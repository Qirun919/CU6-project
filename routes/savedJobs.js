const express = require("express");
const router = express.Router();
const { isValidUser } = require("../middleware/auth");
const {
  savedJobs,
  getSavedJobs,
  deleteSavedJob,
} = require("../controllers/savedJobs");

// ✅ Save a job
router.post("/", isValidUser, async (req, res) => {
  try {
    const userId = req.user._id; // <-- from token
    const { jobId } = req.body;
    const newSavedJob = await savedJobs(userId, jobId);

    res.status(200).send(newSavedJob);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// ✅ Get saved jobs for the logged-in user
router.get("/", isValidUser, async (req, res) => {
  try {
    const userId = req.user._id; // <-- from token
    const jobs = await getSavedJobs(userId);
    res.status(200).send(jobs);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// ✅ Delete saved job
router.delete("/:id", isValidUser, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSavedJob(id);
    res.status(200).send({ message: `Saved job ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
