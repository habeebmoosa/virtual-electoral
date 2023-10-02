import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/userModel.js";

export const registration = async (req, res, next) => {
    try {
        const { name, email, country, phoneno, password } = req.body;

        if (!email || !password || !phoneno) {
            return res.json({ message: "All fileds should be filled" });
        }

        if (await UserModel.findOne({ email })) {
            return res.json({ message: "User is already exist with this email" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ message: "Give correct email address" })
        }

        if (!validator.isStrongPassword(password)) {
            return res.json({ message: "Give strong password" })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            phoneno,
            password: hashPassword
        });
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ message: "With this email user is not their" });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.json({ message: "Password is incorrect. Try again" });
        }

        const data = {
            id: user._id
        };
        const token = jwt.sign(data, process.env.JWT_TOKEN_SECRET, { expiresIn: '24h' });

        res.json({ message: "Loged in", token });
    } catch (error) {
        next(error);
    }
}