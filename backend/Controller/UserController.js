import { sendVerificationEmail, sendWelcomeEmail } from "../lib/Email.js";
import { generateToken } from "../lib/Utils.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";


export const signup = async (req, res) => {
  console.log(req.body)
  const { username, email, password, } = req.body;
  // console.log(req.body);  
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ message: "User has been already registered." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });

    sendVerificationEmail(email, verificationCode);
    await newUser.save();


    if (newUser) {
      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error Signup Controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'Development'
    })
    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const emailVerification = async (req, res) => {
  try {
    const { code, email } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Code or Expired Code." });
    }
    if (user.verificationCode === code) {
      user.verificationCode = undefined;
      await user.save();
      sendWelcomeEmail(user.email);
      generateToken(User._id, res);
      return res.status(200).json({ message: "User isVerified! " });
    }

  } catch (error) {
    console.log("Error in checking email verifcation: ", error);
    res
      .status(500)
      .json({ message: "Error checking verification", error: error.message });
  }
};

export const emailAddressCheck = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      await user.save()
      sendVerificationEmail(email, user.verificationCode);
      res.status(200).json({ username: user.username, email: user.email, })
    }
    else {
      res.status(401).json({ message: "user does'nt exists" })
    }
  } catch (error) {
    console.log("Error in checking email address: ", error);
    res
      .status(500)
      .json({ message: "Error in checking email address", error: error.message });
  }
}

export const addlogin = async (req, res) => {
  try {
    const { Website, username, password, } = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId,{$push:{logins:{Website,username,password}}}, );
    if(!user) res.status(400).json({ message: "user doesn't exists" });
    res.status(201).json({ message: "successfully added"});

  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
}

export const deletelogin = async (req, res) => {
  try {
    const {_id} = req.body;
    if (_id) {
      const deletelogin = await User.findByIdAndUpdate(req.user.userId, {$pull:{logins:{_id}}},{new:true} );
      console.log(deletelogin)
      if (!deletelogin) {
        return res.status(404).json({ message: "logins not found" });
      }
      res.status(200).json({
        message: "login deleted successfully!"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "error while deleting", error: error.message })
  }
}

export const logins = async (req, res) => {
  try {
    const login = await User.findOne(req.user.iserid)
    if (!login) {
      return res.status(404).json({ message: "logins not found" });
    }
    res.status(200).json({
      message: "logins fetch successfully!",
      logins:login.logins
    });
  } catch (error) {
    res.status(500).json({ message: "error while fetch", error: error.message })
  }
}
