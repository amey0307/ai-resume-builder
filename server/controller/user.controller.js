import User from "../model/user.model.js";
import { errorHandler } from "../middleware/error.js";

export const getUserResume = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userResume = await User.find({ email });
        res.status(200).json({ userResume });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const newUserResume = async (req, res, next) => {
    try {
        const { email, title } = req.body;
        const userResume = await User.findOne({ email, title });
        if (userResume) {
            return next(errorHandler(400, "Already Exist"));
        }
        const newUserResume = new User({ email, title });
        newUserResume.save();
        res.status(201).json({ ...newUserResume._doc, success: true });
    } catch (e) {
        res.status(500).json({ message: e });
    }
}
