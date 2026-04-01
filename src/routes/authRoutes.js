import express from "express";
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
    );
};

// ------------------------------------------------
// POST /api/auth/register — Register new user
// ------------------------------------------------
const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        };

        // Create new user
        const user = await User.create({ name, email, password });

        // Return user + token
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ------------------------------------------------
// POST /api/auth/login — Login user
// ------------------------------------------------
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check user exists and password matches
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        };

        // Return user + token
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ------------------------------------------------
// GET /api/auth/me — Get current user
// ------------------------------------------------
const getMe = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json({
            success: true,
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Register routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;