import User from "../Models/UserModel.js";
import CryptoJS from "crypto-js";

export const restorelogin = async (req, res) => {
    try {
        const { _id } = req.body;
        if (_id) {
            const restorelogin = await User.findOneAndUpdate(
                { _id: req.user.userId, "logins._id": _id },
                { $set: { "logins.$.trash": false, "logins.$.trashAt": null } },
            );
            if (!restorelogin) {
                return res.status(404).json({ message: "login not found" });
            }
            res.status(200).json({
                message: "login restore successfully!"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "error while restoring login " })
    }
};

export const permanentlydeletelogin = async (req, res) => {
    try {
        const { _id } = req.body;
        if (_id) {
            const deletelogin = await User.findByIdAndUpdate(
                { _id: req.user.userId },
                { $pull: { logins: { _id } } },
            );
            if (!deletelogin) {
                return res.status(404).json({ message: "logins not found" });
            }
            res.status(200).json({
                message: "login deleted successfully!"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "error while deleting" })
    }
};

export const trashlogins = async (req, res) => {
    try {
        const login = await User.findById({ _id: req.user.userId })
        if (!login) {
            return res.status(404).json({ message: "login not found" });
        }
        const secretKey = process.env.SECRET_KEY;
        const today = new Date();
        const logins = login.logins
            .filter(item => item.trash) // Filter out trashed items
            .map(item => {
                const trashAt = new Date(item.trashAt);
                const daysLeft = 30 - Math.floor((today - trashAt) / (1000 * 60 * 60 * 24));

                return {
                    ...item,
                    _id: item._id,
                    Website: item.Website,
                    username: item.username,
                    password: CryptoJS.AES.decrypt(item.password, secretKey).toString(CryptoJS.enc.Utf8), // Decrypt password
                    daysLeft: Math.max(0, daysLeft), // Prevent negative values
                }
            });
        res.status(200).json({
            message: "logins fetch successfully!",
            deletedlogins: logins,
        });
    } catch (error) {
        res.status(500).json({ message: "error while fetching" })
    }
};

