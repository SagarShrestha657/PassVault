import User from "../Models/UserModel.js";

export const addlogin = async (req, res) => {
    try {
        const { Website, username, password, } = req.body;
        const user = await User.findByIdAndUpdate(
            { _id: req.user.userId },
            { $push: { logins: { Website, username, password } } },
        );
        if (!user) res.status(404).json({ message: "login is not saved" });
        res.status(201).json({ message: "successfully saved" });
    } catch (error) {
        res.status(500).json({ message: "Error while saving" });
    }
};

export const deletelogin = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletelogin = await User.findByIdAndUpdate(
            { _id: req.user.userId },
            { $pull: { logins: { _id } } },
            { new: true },
        );
        if (!deletelogin) res.status(404).json({ message: "login is not deleted" });
        res.status(200).json({ message: "successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting" })
    }
};

export const movetotrashlogin = async (req, res) => {
    try {
        const { _id } = req.body;
        if (_id) {
            const deletelogin = await User.findOneAndUpdate(
                { _id: req.user.userId, "logins._id": _id },
                { $set: { "logins.$.trash": true ,"logins.$.trashAt":new Date()} },
            );
            if (!deletelogin) {
                return res.status(404).json({ message: "login not found" });
            }
            res.status(200).json({
                message: "login deleted successfully!"
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error while moving login to trash page" })
    }
};

export const logins = async (req, res) => {
    try {
        const login = await User.findById({ _id: req.user.userId })
        if (!login) {
            return res.status(404).json({ message: "login not found" });
        }
        const logins = login.logins.filter(item => !item.trash);
        res.status(200).json({
            message: "logins fetch successfully!",
            logins: logins,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error while fetching" })
    }
};