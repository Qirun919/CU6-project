const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const login = async (email, password) => {
  // 1. check if the email provided is in the system
  const user = await User.findOne({ email: email });
  // 2. if not exists, throw an error
  if (!user) {
    throw new Error("Invalid email or password");
  }
  // 3. if exists, compare the password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // generate the JNT token
  let token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET, // secret
    { expiresIn: 60 * 60 * 8 } // expires after 8 hours
  );

  // 4. if the password is correct, return the user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
};

const signup = async (name, email, password) => {
  // 1. check if the email provided is already exists or not
  const emailExists = await User.findOne({ email: email });
  // if email exists, throw an error
  if (emailExists) {
    throw new Error(
      "Email already exists. Please use another email or login with your existing email"
    );
  }
  // 2. create the new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // hash the password
  });
  // 3. save the user
  await newUser.save();

  // 4. generate the token
  let token = jwt.sign(
    {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET, // secret
    { expiresIn: 60 * 60 * 8 } // expires after 8 hours
  );

  // 5. return the user data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

const getUsers = async () => {
  const user = await User.find().sort({ _id: -1 });
  return user;
};

const getUser = async (id) => {
  const user = await User.findById(id);
  return user;
}

const addUser = async (name, email, password, role) => {
  // create new user
  const newUser = new User({
    name,
    email,
    password,
    role,
  });
  // save into mongoDB
  await newUser.save();
  return newUser;
};

const updateUser = async (id, name, email, password, role) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password,
      role,
    },
    {
      new: true,
    }
  );
  return updatedUser;
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  login,
  signup,
  getUserByEmail,
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
