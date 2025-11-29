const User = require("../models/user.model");
const md5 = require("md5");

module.exports.registerPost = async (req, res) => {
  try {
    const { fullName, email, password } = req.body || {};

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const check = await User.findOne({
      email,
      deleted: false,
      status: "active",
    });

    if (check) {
      return res.status(409).json({ message: "Da ton tai" });
    }

    const hashpassword = md5(password);

    const newUser = User({
      fullName: fullName,
      email: email,
      password: hashpassword,
    });
    await newUser.save();
    const token = newUser.token;

    res.cookie("token", token);

    res.status(201).json({
      message: "Register success",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
