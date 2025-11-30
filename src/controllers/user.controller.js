const User = require("../models/user.model");
const md5 = require("md5");
const random = require("../helpers/random.helper");
const ForgotPassword = require("../models/forgot-password.model");
const sendEmail = require("../helpers/sendEmail.helper");

// [post] //api/v1/users/register
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
      token: random.randomString(20),
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

// [post] //api/v1/users/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const checkEmail = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!checkEmail) {
    return res.status(201).json({ message: "Email khong ton tai" });
  }

  if (checkEmail.password !== md5(password)) {
    return res.status(201).json({ message: "Mat khau khong dung" });
  }

  const token = checkEmail.token;
  res.cookie("token", token);

  res.status(200).json({
    message: "Login success",
    token: token,
  });
};

// [post] //api/v1/users/pasword/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    return res.status(201).json({ message: "Email khong ton tai" });
  }

  const objectOtp = {
    email: email,
    otp: random.randomNumber(8),
  };
  const otp = ForgotPassword(objectOtp);
  await otp.save();

  const subject = "Sac thuc OTP ";
  const html = `
    Ma OTP : <b> ${objectOtp.otp} </b>
  `;
  sendEmail.sendEmail(email, subject, html);
  res
    .status(200)
    .json({ message: "Gui ma otp qua email !", objectOtp: objectOtp });
};

// [post] //api/v1/users/password/otp
module.exports.optPost = async (req, res) => {
  const email = req.query.email;
  const otp = req.body.otp;
  const forgotPassword = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!forgotPassword) {
    return res.status(201).json({ message: "Vui long thu lai !" });
  }

  const user = await User.findOne({
    email: email,
  });

  res.cookie("token", user.token);

  res.status(200).json({ message: "Xac thuc thanh cong" });
};

// [post] //api/v1/users/password/reset
module.exports.resetPost = async (req, res) => {
  const password = req.body.password;
  const confirmPass = req.body.confirmPassword;
  const token = req.cookies.token;

  const user = await User.findOne({
    token: token,
  });

  if (password !== confirmPass) {
    return res.status(500).json({
      code: "500",
      message: "Mat khau khong khop ",
    });
  }

  if (user.password === md5(password)) {
    return res.status(500).json({
      code: "500",
      message: "Vui long khong nhap mat khau cu ",
    });
  }

  await User.updateOne(
    {
      token: token,
    },
    {
      password: md5(password),
    }
  );

  res.status(200).json({
    code: "200",
    message: "Thay doi thanh cong",
  });
};

// [post] //api/v1/users/detail
module.exports.detail = async (req, res) => {
  // const token = req.cookies.token;

  // const user = await User.findOne({
  //   token: token,
  //   deleted: false,
  // }).select("-password -token ");

  // if (!user) {
  //   return res.status(500).json({
  //     code: "500",
  //     message: "Vui long thu lai!",
  //   });
  // }

  res.status(200).json({
    code: "200",
    user: req.user,
  });
};
