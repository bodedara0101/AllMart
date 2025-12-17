import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudenary.js";
import bcrypt from 'bcryptjs';

export const addUserHandler = async (req, res) => {
    console.log('in addUserHandler');
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
      role : role
    });
    await newUser.save();
    res.status(200).json({ message: "User added successfully" , user: newUser});
  } catch (error) {
    console.log(error)
  }
};
