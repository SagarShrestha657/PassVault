import User from "../Models/UserModel";

export const addlogin = async (req, res) => {
    try {
        const { Website, username, password, } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId.ObjectId, 
            { $push: { logins: { Website, username, password } } },
        );
        if (!user) res.status(400).json({ message: "user doesn't exists" });
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
                { $set: { "logins.trash": true } },
                { new: true },
            );
            console.log(deletelogin)
            if (!deletelogin) {
                return res.status(404).json({ message: "login not found" });
            }
            res.status(200).json({
                message: "login deleted successfully!"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "error while deleting", error: error.message })
    }
};

export const logins = async (req, res) => {
    try {
        const login = await User.findOne(req.user.userId.ObjectId)
        if (!login) {
            return res.status(404).json({ message: "login not found" });
        }
        const logins = []
        for (i = 0; login.logins.length() > i; i++) {
            if (login.logins.trash[i] === false) {
                logins = login.logins[i]
            }
        }
        res.status(200).json({
            message: "logins fetch successfully!",
            logins: logins,
        });
    } catch (error) {
        res.status(500).json({ message: "error while fetch", error: error.message })
    }
};