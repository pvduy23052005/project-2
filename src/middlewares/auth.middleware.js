const User = require("../models/user.model");

module.exports.auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(400).json({
      code: "400",
      message: "Vui long gui token len ",
    });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      code: "400",
      message: "Vui long gui token len ",
    });
  }

  const user = await User.findOne({
    token: token,
    deleted: false,
  }).select("-password");
  if (!user) {
    return res.status(400).json({
      code: "400",
      message: "Token khong hop le ",
    });
  }

  req.user = user;
  next();
};
