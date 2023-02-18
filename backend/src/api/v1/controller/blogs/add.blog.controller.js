const  { TEXTS } = require( "../../../../constant/texts.constant")
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../../../models/user/user.model");
const Bcrypt = require('bcryptjs');
const { BlogModel } = require("../../../../models/blogs/blogs.model");
require('dotenv').config();


exports.addBlog = async (req, res) => {
    try {
        
        const {text,heading} = req.body;
        const imageInfo = req.file ;
        const userId = req.user_info.userId ;
        const blogInstance = new BlogModel({text:text,heading,heading,image:imageInfo,user_id:userId})
        const saveBlog = await blogInstance.save()
        return res.status(200).send({text:TEXTS.submit_succ_text,result:saveBlog})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}