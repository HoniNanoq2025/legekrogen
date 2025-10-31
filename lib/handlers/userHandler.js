const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//CREATE - opret ny bruger
const createUser = async ({ name, email, role, password, image }) => {
  try {
    // Tjek om e-mail allerede findes
    const existing = await User.findOne({ email });
    if (existing) return { status: "error", message: "Email findes allerede" };

    // Hash password før det gemmes
    const hashedPassword = await bcrypt.hash(password, 10);

    // Opret ny bruger
    const newUser = await User.create({
      name,
      email,
      role,
      hashedPassword,
      picture: image,
    });

    return { status: "ok", user: newUser };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

// UPDATE eksisterende bruger
const updateUser = async (data) => {
  try {
    const { id, ...fields } = data; // Hent ID og andre felter
    const user = await User.findById(id);
    if (!user) return { status: "not found", message: "Bruger ikke fundet" };

    Object.assign(user, fields);
    await user.save();
    return { status: "ok", user };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

// DELETE bruger via ID
const deleteUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    await user.deleteOne(); // Slet bruger
    return { status: "ok", message: "Bruger slettet" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

// GET bruger via ID
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    return { status: "ok", user };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

// GET alle brugere
const getUsers = async () => {
  try {
    const users = await User.find({});
    return { status: "ok", users };
  } catch (err) {
    return { status: "error", message: err.messsage };
  }
};

// LOGIN bruger - autentificer bruger og generer JWT
const loginUser = async (email, password) => {
  try {
    // Find bruger via e-mail
    const user = await User.findOne({ email });
    if (!user)
      return { status: "error", message: "Ugyldig email eller password" };

    // Sammenlign plaintext password med hashed password i database
    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match)
      return { status: "error", message: "Ugyldig email eller password" };

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { status: "ok", user, token };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

// EXPORT HANDLERS
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
};
