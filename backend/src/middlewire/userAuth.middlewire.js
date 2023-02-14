const JWT = require("jsonwebtoken");
require('dotenv').config();
const  { TEXTS } = require( "../constant/texts.constant")
exports.userAuth=async(req,res,next)=>{
    try {
        const userKey = req.headers["user-key"]
        console.log(userKey,process.env.JWT_TOKEN_KEY)

        const decoded = JWT.verify(userKey, process.env.JWT_TOKEN_KEY)
        req.user_info= decoded ;
        next()
    } catch (error) {
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}