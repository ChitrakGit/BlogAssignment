const  { TEXTS } = require( "../../../../constant/texts.constant")
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../../../models/user/user.model");
const Bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

require('dotenv').config();
exports.getUser = async (req, res) => {
    try {
        const user_id = new mongoose.Types.ObjectId(req.user_info.userId);
        const userInfo = await UserModel.aggregate([
            {
                $match:{
                    _id:user_id
                }
            },
            {
                $lookup:{
                    from:"blogs",
                    localField:"_id",
                    foreignField:"user_id",
                    as:"blogs"
                }
            }
        ])
        return res.status(200).send({text:TEXTS.get_succ_text,userInfo:userInfo[0]})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}


