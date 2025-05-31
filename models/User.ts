import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpiry: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordTokenExpiry: { type: Date, default: null },
    lastLogin: { type: Date, default: null },
    roles: { type: [String], default: ["user"] }, // e.g., ['user', 'admin']
    status: { type: String, default: "inactive" }, // e.g., 'active', 'inactive', 'banned'
    socialLinks: {
        x: { type: String, default: "" },
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" }
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;