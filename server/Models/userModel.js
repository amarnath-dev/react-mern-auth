const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        filename: String,
    },
}, { timestamps: true })

const User = mongoose.model('user', userSchema)
module.exports = User;