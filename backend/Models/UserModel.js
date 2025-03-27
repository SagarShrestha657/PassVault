import mongoose from "mongoose";

const userschema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: "string",
            required: true,
        },
        password: {
            type: "string",
            required: true,
        },
        verificationCode: {
            type: "string",
            default: null,
            expires: 60 * 10,
        },
        logins: [{
            Website: {
                type: "string",
                required: true,
            },
            username: {
                type: "string",
                required: true,
            },
            password: {
                type: "string",
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
                type: "string",
                default: null,
            },
            browser: {
                type: "string",
                default: null,
            },
            os: {
                type: "string",
                default: null,
            },
            device: {
                type: "string",
                default: null,
            },
            location: {
                type: "string",
                default: null,
            },
        },
    }
);

const User = mongoose.model("User", userschema);
export default User;