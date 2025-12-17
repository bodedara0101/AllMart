import { User } from "../models/users.model.js";

export const deleteUserHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.destroy({ where: { id: userId } });
        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
}