const  { TEXTS } = require( "../../../../constant/texts.constant")
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../../../models/user/user.model");
const Bcrypt = require('bcryptjs');

require('dotenv').config();
exports.getUsers = async (req, res) => {
    try {
        
        return res.status(200).send({text:TEXTS.get_succ_text})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}


