import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });


userSchema.methods.createJWT = function () {
    return Jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: process.env.ACCESS_LIMIT });
}


export default mongoose.model("user", userSchema);