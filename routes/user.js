const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { isAdmin } = require("../middleware/auth");

/*
    POST /users/signup
    POST /users/login
*/

// POST /users/login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await login(email, password);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /users/signup
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = await signup(name, email, password);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// add a new user ( this is for admin to add user in user dashboard )
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const newUser = await addUser(name, email, password, role);
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update user
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const updatedUser = await updateUser(id, name, email, password, role);
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete user
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteUser(id);
    res.status(200).send({
      message: `User #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
