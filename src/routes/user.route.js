const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.post("/register", controller.registerPost);

router.post("/login", controller.loginPost);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/opt", controller.optPost);

router.post("/password/reset", controller.resetPost);

router.get("/detail", controller.detail);

module.exports = router;
