const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv=require("dotenv")
require('dotenv').config();


// LOGIN
const Login =  async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "No user found. Please register." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(404).json({ message: "Incorrect password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res.status(200).json({ token, message: "Login successful" });
// return res.json({message:"login successful"});
};

// REGISTER
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(404).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  return res.json({ token, message: "Registration successful" });

// return res.json({message:"register successful"});
};

module.exports = {
    Login,
    Register
};
