const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const private = require("../middlewares/auth.middleware");

router.post("/register", controller.registerPost);

router.post("/login", controller.loginPost);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/opt", controller.optPost);

router.post("/password/reset", controller.resetPost);

router.get("/detail", private.auth, controller.detail);

router.get("/list", private.auth, controller.listUser);

module.exports = router;
