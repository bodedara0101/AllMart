import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/users.model.js"; // Assuming you have a User model
import { uploadOnCloudinary } from "../utils/cloudenary.js";

const secretKey = "hello there"; // Replace with your secret key
// Middleware for user signup
const signup = async (req, res, next) => {
  console.log("in signup");

  try {
    const { username, password, role } = req.body;
    const file = req.file;
    console.log(file);
    const result = await uploadOnCloudinary(file.path);
    console.log(result);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      image: result.url,
      role: role,
      lastLogin: new Date(),
    });
    await newUser.save();
    next();
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
    console.log(error);
  }
};

// Middleware for user login
const login = async (req, res) => {
  console.log("in login");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    console.log(user.toJSON().id);
    const fuser = user.toJSON();
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: fuser.id }, secretKey, {
      expiresIn: "10m",
    });
    res.status(200).json({ message: "Login successful", token, fuser });
    user.lastLogin = new Date();
    await user.save();
  } catch (error) {
    res.status(500).json({ message: "user not found", error });
  }
};

// Middleware to verify JWT token
const authenticate = async (req, res, next) => {
  console.log('in auth')
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] }, // Exclude sensitive data
    });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default { signup, login, authenticate };

