const express = require("express")
const UserController = require("../../controller/user/sign.user.controller");
const {userAuth} = require("../../../../middlewire/userAuth.middlewire");
const {validator} = require("../../../../middlewire/validator.middlewire");
const { signupValidator,loginValidator } = require("../../validator/user.validator");


const router = express.Router();

// router.route("/").get(UserController.getUsers);
router.route("/signup").post(validator(signupValidator),UserController.signup);
router.route("/login").post(validator(loginValidator),UserController.login);
module.exports = router;