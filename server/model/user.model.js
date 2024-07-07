import mongoose from "mongoose";

const userResumeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const UserResume = mongoose.model("User-Resume", userResumeSchema);
export default UserResume;