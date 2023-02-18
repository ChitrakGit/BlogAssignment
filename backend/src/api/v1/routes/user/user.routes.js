const express = require("express")
const UserController = require("../../controller/user/sign.user.controller");
const {userAuth} = require("../../../../middlewire/userAuth.middlewire");
const {validator} = require("../../../../middlewire/validator.middlewire");
const { signupValidator,loginValidator } = require("../../validator/user.validator");
const { getUser } = require("../../controller/user/get.user.controller");


const router = express.Router();

router.route("/profile").get(userAuth,getUser);
router.route("/signup").post(validator(signupValidator),UserController.signup);
router.route("/login").post(validator(loginValidator),UserController.login);
router.route("/logout").get(UserController.logout);
module.exports = router;