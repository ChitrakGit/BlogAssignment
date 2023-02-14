const express = require("express")
const AddBlogController = require("../../controller/blogs/add.blog.controller");
const ViewBlogController = require("../../controller/blogs/get.blog.controller");
const EditBlogController = require("../../controller/blogs/edit.blog.controller");
const {userAuth} = require("../../../../middlewire/userAuth.middlewire");
const {validator} = require("../../../../middlewire/validator.middlewire");
const {upload} = require("../../../../config/multer");
const { addBlogValidator } = require("../../validator/blog.validator");

// console.log(upload)


const router = express.Router();
router.route("/").get(ViewBlogController.getBlogs)
router.route("/:blog_id").get(ViewBlogController.getBlog)

router.route("/can-edit/:blog_id").get(userAuth,EditBlogController.editPermission)
router.route("/add").post(upload.single("image"),validator(addBlogValidator,"blogInfo"),userAuth,AddBlogController.addBlog);
module.exports = router;