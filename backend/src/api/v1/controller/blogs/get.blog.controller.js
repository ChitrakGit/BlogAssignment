const  { TEXTS } = require( "../../../../constant/texts.constant")
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../../../models/user/user.model");
const Bcrypt = require('bcryptjs');
const { BlogModel } = require("../../../../models/blogs/blogs.model");
require('dotenv').config();


exports.getBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate("user_id",{_id:0,name:1,email:1});
        return res.status(200).send({text:TEXTS.get_succ_text,blogs})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}

exports.getBlog = async (req, res) => {
    try {
        const {blog_id} = req.params ;
        if(!blog_id) return res.status(400).send({text:TEXTS.blog_key_not_found});

        const blog = await BlogModel.findById(blog_id).populate("user_id",{_id:0,name:1,email:1});
        return res.status(200).send({text:TEXTS.get_succ_text,blog})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}