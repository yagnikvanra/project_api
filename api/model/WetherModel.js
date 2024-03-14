import mongoose from "mongoose";

const wetherSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active: {
        type: Boolean,
        enum: ["true", "false"],
        default: true
    },
    geolocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    }
}, { timestamps: true });

export default mongoose.model('wether', wetherSchema);