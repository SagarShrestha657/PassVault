import mongoose from "mongoose";

const userschema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        verificationCode: {
            type: String,
            default: null,
            expires: 60 * 10,
        },
        logins: [{
            Website: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            trash: {
                type: Boolean,
                default: false,
            },
            trashAt: {
                type: Date,
                default: null,
            },
        }],
        isverified: {
            type: Boolean,
            default: false,
        },
        device_info: {
            ip: {
                type: String,
                default: null,
            },
            browser: {
                type: String,
                default: null,
            },
            os: {
                type: String,
                default: null,
            },
            device: {
                type: String,
                default: null,
            },
            location: {
                type: String,
                default: null,
            },
        },
        url: [{
            originalUrl: {
                type: String,
            },
            shortUrl: {
                type: String,
            },
        }]
    }
);

const User = mongoose.model("User", userschema);
export default User;