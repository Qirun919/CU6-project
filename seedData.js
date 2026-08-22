// seedData.js
// Run this with: node seedData.js
// Make sure your .env file has MONGODB_URL set (e.g. mongodb://localhost:27017)

require("dotenv").config();
const mongoose = require("mongoose");
const Specialisation = require("./models/specialisation");
const Job = require("./models/job");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL + "/JobSearch");
    console.log("MongoDB Connected");

    // 1. Clear existing data (optional - comment out if you don't want to wipe)
    await Specialisation.deleteMany({});
    await Job.deleteMany({});

    // 2. Create Specialisations
    const specialisations = await Specialisation.insertMany([
      { label: "Software Development" },
      { label: "Data Analytics" },
      { label: "UI/UX Design" },
      { label: "Marketing" },
      { label: "Finance" },
    ]);
    console.log(`Inserted ${specialisations.length} specialisations`);

    const findSpec = (label) =>
      specialisations.find((s) => s.label === label)._id;

    // 3. Create Jobs
    const jobs = await Job.insertMany([
      {
        title: "Junior Frontend Developer",
        description:
          "Build and maintain user-facing features using React and Tailwind CSS.",
        companyName: "TechNova Sdn Bhd",
        location: "Johor Bahru, Malaysia",
        salary: "RM 3,000 - RM 4,000",
        role: "Full-Time",
        specialisation: findSpec("Software Development"),
        postedBy: "hr@technova.com",
      },
      {
        title: "Backend Developer (Node.js)",
        description:
          "Design and maintain RESTful APIs using Express and MongoDB.",
        companyName: "CloudBridge Solutions",
        location: "Remote",
        salary: "RM 4,000 - RM 6,000",
        role: "Full-Time",
        specialisation: findSpec("Software Development"),
        postedBy: "careers@cloudbridge.com",
      },
      {
        title: "Data Analyst Intern",
        description:
          "Assist in cleaning, analyzing, and visualizing business datasets.",
        companyName: "InsightWorks",
        location: "Singapore",
        salary: "Undisclosed",
        role: "Internship",
        specialisation: findSpec("Data Analytics"),
        postedBy: "internships@insightworks.com",
      },
      {
        title: "UI/UX Designer",
        description:
          "Design intuitive interfaces and user flows for mobile and web apps.",
        companyName: "PixelCraft Studio",
        location: "Kuala Lumpur, Malaysia",
        salary: "RM 3,500 - RM 5,000",
        role: "Full-Time",
        specialisation: findSpec("UI/UX Design"),
        postedBy: "jobs@pixelcraft.com",
      },
      {
        title: "Digital Marketing Executive",
        description:
          "Manage social media campaigns and analyze marketing performance.",
        companyName: "BrightWave Media",
        location: "Johor Bahru, Malaysia",
        salary: "RM 2,800 - RM 3,800",
        role: "Full-Time",
        specialisation: findSpec("Marketing"),
        postedBy: "hr@brightwave.com",
      },
      {
        title: "Finance Associate",
        description: "Support budgeting, forecasting, and financial reporting.",
        companyName: "Meridian Capital",
        location: "Remote",
        salary: "RM 3,200 - RM 4,500",
        role: "Full-Time",
        specialisation: findSpec("Finance"),
        postedBy: "recruit@meridiancapital.com",
      },
    ]);
    console.log(`Inserted ${jobs.length} jobs`);

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
