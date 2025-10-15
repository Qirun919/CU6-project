const express = require("express");
const router = express.Router();

const {
  getContactByUser,
  getConatctByaJob,
  addContact,
  deleteContact,
  updateContact,
} = require("../controllers/contact");

const { isValidUser, isEmployerAndAdmin } = require("../middleware/auth");

// get all contact messages for a user
router.get("/user/:userId", isValidUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const contacts = await getContactByUser(userId);
    res.status(200).send(contacts);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// get all contact messages for a job (employer only)
router.get("/job/:jobId", isEmployerAndAdmin, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const employerId = req.user._id; // ✅ capture employer userId from token
    const contacts = await getConatctByaJob(jobId, employerId);
    res.status(200).send(contacts);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// add new contact message
router.post("/", isValidUser, async (req, res) => {
  try {
    const { userId, jobId, message, resume } = req.body;
    const newContact = await addContact(userId, jobId, message, resume);
    res.status(200).send(newContact);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete a contact message by id
router.delete("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteContact(id);
    res.status(200).send({ message: `Contact message ${id} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update status of contact message by id (employer only)
router.put("/:id", isEmployerAndAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const updatedContact = await updateContact(id, status);
    res.status(200).send(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
