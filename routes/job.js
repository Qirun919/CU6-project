const express = require("express");
const router = express.Router();

const { isEmployerAndAdmin } = require("../middleware/auth");
const {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob,
} = require("../controllers/job");

// get all jobs
router.get("/", async (req, res) => {
  try {
    const { specialisation, page } = req.query;
    const jobs = await getJobs(specialisation, page);
    res.status(200).send(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to get jobs" });
  }
});

// get single job
router.get("/:id", async (req, res) => {
  try {
    const job = await getJob(req.params.id);
    if (!job) return res.status(404).send({ message: "Job not found" });
    res.status(200).send(job);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to get job" });
  }
});

// get job made by own (employer)
router.get("/employer/:userName", async (req, res) => {
  try {
    const allJobs = await getJobs(); // fetch all jobs
    const employerJobs = allJobs.filter(
      (job) => job.postedBy === req.params.userName
    );
    res.status(200).send(employerJobs);
  } catch (err) {
    res.status(500).send({ message: "Failed to get employer jobs" });
  }
});

// add job
router.post("/", isEmployerAndAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      companyName,
      location,
      salary,
      role,
      specialisation,
      postedBy,
    } = req.body;

    if (
      !title ||
      !description ||
      !companyName ||
      !location ||
      !salary ||
      !role ||
      !specialisation ||
      !postedBy
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newJob = await addJob(
      title,
      description,
      companyName,
      location,
      salary,
      role,
      specialisation,
      postedBy
    );

    res.status(200).send(newJob);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update job
router.put("/:id", isEmployerAndAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      companyName,
      location,
      salary,
      role,
      specialisation,
      postedBy,
    } = req.body;

    if (
      !title ||
      !description ||
      !companyName ||
      !location ||
      !salary ||
      !role ||
      !specialisation ||
      !postedBy
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const updatedJob = await updateJob(
      req.params.id,
      title,
      description,
      companyName,
      location,
      salary,
      role,
      specialisation,
      postedBy
    );

    if (!updatedJob) return res.status(404).send({ message: "Job not found" });

    res.status(200).send(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete job
router.delete("/:id", isEmployerAndAdmin, async (req, res) => {
  try {
    const deleted = await deleteJob(req.params.id);
    if (!deleted) return res.status(404).send({ message: "Job not found" });

    res.status(200).send({
      message: `Job with ID ${req.params.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
