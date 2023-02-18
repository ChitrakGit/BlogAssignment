const  { TEXTS } = require( "../../../../constant/texts.constant")
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../../../models/user/user.model");
const Bcrypt = require('bcryptjs');
const { BlogModel } = require("../../../../models/blogs/blogs.model");
require('dotenv').config();


exports.editPermission = async (req, res) => {
    try {
        
        let canEdit = false ;
        // const { blog_id} = req.params ;
        // const userInfo = await UserModel.findById(req.user_info.userId) ;
        // const blogInfo = await BlogModel.findById(blog_id) ;
        // console.log(String(userInfo._id) == String(blogInfo.user_id),userInfo._id, blogInfo.user_id)
        // if(String(userInfo._id) == String(blogInfo.user_id)) canEdit = true ;
        
        return res.status(200).send({text:TEXTS.get_succ_text,canEdit})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        
        const { blog_id} = req.params ;
        const deletedBlog = await BlogModel.findByIdAndDelete(blog_id) ;

        return res.status(200).send({text:TEXTS.submit_dlt_text})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}

exports.editBlog = async (req, res) => {
    try {
        const {blog_id} = req.params ;
        const updateInfo = req.body;
        
        const imageInfo = req.file ;
        // if user not upload image the previous image should not changed
        if(imageInfo){
            updateInfo.image = imageInfo
        }
        const userId = req.user_info.userId ;
        const updateBlog = await BlogModel.findByIdAndUpdate(blog_id,{$set:updateInfo})
       
        return res.status(200).send({text:TEXTS.submit_succ_text})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}

