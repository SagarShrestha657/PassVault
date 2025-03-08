import User from "../Models/UserModel.js";

export const addlogin = async (req, res) => {
    try {
        const { Website, username, password, } = req.body;
        const user = await User.findByIdAndUpdate(
            { _id: req.user.userId },
            { $push: { logins: { Website, username, password } } },
        );
        if (!user) res.status(404).json({ message: "user doesn't exists" });
        res.status(201).json({ message: "successfully added" });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
};

export const movetotrashlogin = async (req, res) => {
    try {
        const { _id } = req.body;
        if (_id) {
            const deletelogin = await User.findOneAndUpdate(
                { _id: req.user.userId, "logins._id": _id },
                { $set: { "logins.$.trash": true } },
                { new: true },
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
        res.status(500).json({ message: "error while deleting", error: error.message })
    }
};

export const logins = async (req, res) => {
    try {
        const login = await User.findOne({ _id: req.user.userId })
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
        res.status(500).json({ message: "error while fetch", error: error.message })
    }
};