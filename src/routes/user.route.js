const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.post("/register", controller.registerPost);

router.post("/login", controller.loginPost);

module.exports = router;
