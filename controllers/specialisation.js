const Specialisation = require("../models/specialisation");

// get all Specialisation
const getSpecialisations = async () => {
  const getSpecialisations = await Specialisation.find().sort({ _id: -1 });
  return getSpecialisations;
};

// get a single Specialisation by id
const getSpecialisation = async (id) => {
  const getSpecialisation = await Specialisation.findById(id);
  return getSpecialisation;
};

// add new Specialisation
const addSpecialisation = async (label) => {
  // create a new Specialisation
  const newSpecialisation = new Specialisation({
    label,
  });
  await newSpecialisation.save();

  return newSpecialisation;
};

// update a Specialisation
const updateSpecialisation = async (id, label) => {
  const updateSpecialisation = await Specialisation.findByIdAndUpdate(
    id,
    {
      label,
    },
    {
      new: true,
    }
  );
  return updateSpecialisation;
};

// delet a Specialisation
const deleteSpecialisation = async (id) => {
  return await Specialisation.findByIdAndDelete(id);
};

module.exports = {
  getSpecialisations,
  getSpecialisation,
  addSpecialisation,
  updateSpecialisation,
  deleteSpecialisation,
};
