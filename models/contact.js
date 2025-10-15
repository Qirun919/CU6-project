const { Schema, model } = require("mongoose");

// declare schema for product
const contactSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // who applied
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true }, // job applied to
  resume: { type: String, required: true }, // could be a file URL or text
  message: { type: String }, // optional cover letter / message
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"], // enum limit the value to the provided option only
  },
  dateApplied: { type: Date, default: Date.now }, // wehn applied
});

// create a model from the schema
const Contact = model("Contact", contactSchema);
//export the model
module.exports = Contact;
