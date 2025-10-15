// models/specialisation.js
const { Schema, model } = require("mongoose");

const specialisationSchema = new Schema({
  label: { type: String, required: true },
});

const Specialisation = model("Specialisation", specialisationSchema);
module.exports = Specialisation;
