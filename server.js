// load the enviroment variables
require("dotenv").config();

const express = require("express");
// import mongoose
const mongoose = require("mongoose");
const cors = require("cors");

// setup an express app
const app = express();

//setup cors policy
app.use(cors());

// setup a middleware to handle JSON request
app.use(express.json());

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/JobSearch");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routers

// users
app.use("/users", require("./routes/user"));

// jobs
app.use("/jobs", require("./routes/job"));

// specialisations
app.use("/specialisations", require("./routes/specialisation"));

// savedjobs
app.use("/savedjobs", require("./routes/savedJobs"));

// contact
app.use("/contacts", require("./routes/contact"));


// start the express server
app.listen(5919, () => {
  console.log("server is running at http://localhost:5919");
});
