import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudenary.js";
import bcrypt from 'bcryptjs';

export const updateUserHandler = async (req, res) => {
    console.log('in updateUserHandler');
  try {
    const { username, role , id } = req.body;
    const file = req.file;
    console.log(file);
    if(!file){
        const updatedUser = await User.findByPk(id);
        updatedUser.username = username;
        updatedUser.role = role;
        await updatedUser.save();
        res.status(200).json({ message: "User updated successfully" , user: updatedUser});
        return;
    }
    const result = await uploadOnCloudinary(file.path);
    console.log(result);
    const updatedUser = await User.findByPk(id);
    updatedUser.username = username;
    updatedUser.role = role;
    updatedUser.image = result.url;
    await updatedUser.save();
    res.status(200).json({ message: "User updated successfully" , user: updatedUser});
  } catch (error) {
    console.log(error)
  }
};
