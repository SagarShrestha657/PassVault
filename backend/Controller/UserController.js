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

    if (!user.isverified) {
      console.log(user.isverified)
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      await User.findOneAndUpdate(
        { email },
        {  verificationCode: verificationCode  },
      );
      sendVerificationEmail(user.email, verificationCode);
      return res.status(200).json({
        emailverification: false,
        username: user.username,
        email: user.email,
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      emailverification: true,
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
      user.verificationCode = null;
      user.isverified = true;
      await user.save();
      sendWelcomeEmail(user.email);
      await generateToken(User._id, res);
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
};

export const checkauth = (req, res) => {
  try {
    if (req.user.userId) return res.status(200).json({ message: "token is provided" })
    res.status(401).json({ meaasge: "token not provided" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};
