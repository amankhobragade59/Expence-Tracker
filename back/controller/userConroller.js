import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();
const secret = process.env.SECRET;

export const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const newUser = await new User({
            name, email, password
        });
        await newUser.save();

        res.status(201).json({ newUser, message: "User added" });
    } catch (error) {
        console.log("error in addUser " + error);
        res.status(500).json({ message: "error in addUser" });
    }



}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email dont exists" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign({ user: user }, secret);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
        });

        res.status(200).json({ token, user, message: "Login successfull" });
    } catch (error) {
        console.log("error in loginUser " + error);
        res.status(500).json({ message: "error in loginuser" });
    }
}

export const getAuthUser = async (req, res) => {
    try {
        // req.user.id comes from verifyToken middleware
        const user = await User.findById(req.user.user._id).select("-password"); // exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error getting auth user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Logout failed" });
    }
};
