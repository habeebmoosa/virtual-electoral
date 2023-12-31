import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phoneno: {
        type: Number,
        min:10,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true});

export const UserModel = mongoose.model("users",userSchema);