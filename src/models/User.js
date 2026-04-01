import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        // user's name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // user's email — unique
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        // hashed password
        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        // user role
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;