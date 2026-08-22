const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true }, // keep as string for "Undisclosed"
  role: { type: String, required: true }, // e.g. "Full-Time", "Internship"
  specialisation: {
    type: Schema.Types.ObjectId,
    ref: "Specialisation",
    required: true,
  },
  postedBy: { type: String }, // optional
  datePosted: { type: Date, default: Date.now },
});

// create a Modal from the schema
const Job = model("Job", jobSchema);

// export the Modal
module.exports = Job;
