const  { TEXTS } = require( "../../../../constant/texts.constant")
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../../../models/user/user.model");
const Bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
    try {
        let {email,password} = req.body;

        const user = await UserModel.findOne({email:email})
        if(!user) return res.status(400).send({text:TEXTS.user_not_found})
        
        const isValidate = Bcrypt.compareSync(password, user.password);
        if(!isValidate) if(!user) return res.status(400).send({text:TEXTS.auth_error});


        const key = JWT.sign({userId:user._id},process.env.JWT_TOKEN_KEY)
        return res.status(200).send({text:TEXTS.get_succ_text,key})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}

exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        let {email,password,name} = req.body;
        //check email exists or not
        const user = await UserModel.findOne({email:email})
        if(user) return res.status(400).send({text:TEXTS.email_already_use})
        // gen password
        const salt = Bcrypt.genSaltSync(10);
        const _password = Bcrypt.hashSync(password, salt);
        // save user instance
        const userInstance = new UserModel({email:email,password:_password,name:name})
        const saveUser = await userInstance.save()
        const key = JWT.sign({userId:user._id},process.env.JWT_TOKEN_KEY)
        
        return res.status(200).send({text:TEXTS.get_succ_text,key,userInfo:saveUser})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}