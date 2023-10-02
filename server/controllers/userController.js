import { UserModel } from "../models/userModel.js";

export const updateUser = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
             req.id ,
            { $set: req.body },
            { new: true }
        );
        res.status(500).json({ message: "User updated successfully" });
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json("User deleted successfully");
    } catch (error) {
        res.json(error);
    }
}

export const listUser = async (req, res) => {
    try {
        const getUsers = await UserModel.find();
        res.json(getUsers);
    } catch (error) {
        res.json(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const { name, email, phoneno } = await UserModel.findOne({ _id: req.id });
        if (!email) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json([{ name: name, email: email, phoneno: phoneno }]);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}