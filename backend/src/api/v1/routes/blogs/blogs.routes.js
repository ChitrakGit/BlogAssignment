const express = require("express")
const AddBlogController = require("../../controller/blogs/add.blog.controller");
const ViewBlogController = require("../../controller/blogs/get.blog.controller");
const EditBlogController = require("../../controller/blogs/edit.blog.controller");
const MiddleWire = require("../../../../middlewire/userAuth.middlewire");
const {validator} = require("../../../../middlewire/validator.middlewire");
const {upload} = require("../../../../config/multer");
const { addBlogValidator } = require("../../validator/blog.validator");

// console.log(upload)


const router = express.Router();
router.route("/").get(MiddleWire.readerAuth,ViewBlogController.getBlogs)

router.route("/edit/:blog_id").put(upload.single("image"),MiddleWire.userAuth,EditBlogController.editBlog)
router.route("/delete/:blog_id").delete(MiddleWire.userAuth,EditBlogController.deleteBlog)

// router.route("/can-edit/:blog_id").get(MiddleWire.userAuth,EditBlogController.editPermission)
router.route("/:blog_id").get(MiddleWire.readerAuth,ViewBlogController.getBlog)
// ,validator(addBlogValidator,"blogInfo")
router.route("/add").post(upload.single("image"),MiddleWire.userAuth,AddBlogController.addBlog);
module.exports = router;