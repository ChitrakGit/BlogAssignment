const  { TEXTS } = require( "../../../../constant/texts.constant")
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../../../models/user/user.model");
const Bcrypt = require('bcryptjs');
const { GenKey } = require("../../../../services/auth");


exports.login = async (req, res) => {
    try {
        let {email,password} = req.body;
        
        const user = await UserModel.findOne({email:email})
        if(!user) return res.status(400).send({text:TEXTS.user_not_found})
        
        const isValidate = Bcrypt.compareSync(password, user.password);
        if(!isValidate) if(!user) return res.status(400).send({text:TEXTS.auth_error});

        const key = GenKey({userId:user._id})
        
        res.setHeader('secret_token',key.refreshToken)
        res.setHeader('auth_token',key.authToken)
        
        return res.status(200).send({text:TEXTS.get_succ_text,key:key})
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
        const key = GenKey({userId:userInstance._id})
        
        res.setHeader('secret_token',key.refreshToken)
        res.setHeader('auth_token',key.authToken)
        
        return res.status(200).send({text:TEXTS.get_succ_text,key,userInfo:saveUser})
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}

exports.logout = async (req, res) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ViZGViYjg0NGMyMWViMTEwOWUxZTUiLCJpYXQiOjE2NzY2NjM3OTcsImV4cCI6MTY3NjY2Mzg1N30.aHuZXqQYYOxf4xum_x32k93DOmg3hI_AJSCA_gGUHBk";


        const isVerify = JWT.verify(token,process.env.JWT_TOKEN_KEY,function(err, decoded) {
            if (err) {
                
                // console.log(err);
                return res.status(408).send({text:TEXTS.general_error,message:"Token Expired"})
            }
            else {
                
                console.log("Token verified successfully");
                return res.status(200).send({text:TEXTS.get_succ_text})
            }
        })
        
        // const user = await UserModel.findOne({email:email})
        // if(!user) return res.status(400).send({text:TEXTS.user_not_found})
        
        // const isValidate = Bcrypt.compareSync(password, user.password);
        // if(!isValidate) if(!user) return res.status(400).send({text:TEXTS.auth_error});

        
        // const key = GenKey({userId:user._id})
        // req.session.isAuth = true ;
        // req.session.user_id = user._id ;
        

        
    } catch (error) {
        console.log(error.message, error)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}