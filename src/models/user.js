const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 12,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 12,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value) ) {
                throw new Error("Gender data is not a valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
        type: String,
        default: "This is the defaukt about of the user",
    },
    skills: {
        type: [String]
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);
