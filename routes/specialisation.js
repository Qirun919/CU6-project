const express = require("express");
// set up Specialisation router
const router = express.Router();

const {
  getSpecialisations,
  getSpecialisation,
  addSpecialisation,
  updateSpecialisation,
  deleteSpecialisation,
} = require("../controllers/specialisation");

const { isAdmin } = require("../middleware/auth");

// get all Specialisation
router.get("/", async (req, res) => {
  try {
    const specialisations = await getSpecialisations();
    res.status(200).send(specialisations);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// get Specialisation
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const specialisation = await getSpecialisation(id);
    res.status(200).send(specialisation);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// create new Specialisation
router.post("/", isAdmin, async (req, res) => {
  try {
    const label = req.body.label;
    const newSpecialisation = await addSpecialisation(label);
    res.status(200).send(newSpecialisation);
  } catch (error) {
    console.log(error.response.data);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update Specialisation
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const label = req.body.label;
    const updatedSpecialisation = await updateSpecialisation(id, label);
    res.status(200).send(updatedSpecialisation);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete Specialisation
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteSpecialisation(id);
    res.status(200).send({
      message: `Specialisation #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
