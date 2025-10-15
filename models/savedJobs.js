const { Schema, model } = require("mongoose");

const savedJobsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  dateSaved: { type: Date, default: Date.now },
});

const SavedJobs = model("SavedJobs", savedJobsSchema);
module.exports = SavedJobs;
