const JWT = require("jsonwebtoken");
require('dotenv').config();
const  { TEXTS, CONSTANTS } = require( "../constant/texts.constant");
const { verifyToken, ReGenKey } = require("../services/auth");
exports.userAuth=async(req,res,next)=>{
    try {
        const {auth_token,secret_token} = req.headers;
        
        const currentTime = (new Date()).getTime() ;
        if(auth_token != undefined && secret_token != undefined){
            
            const authVerify = verifyToken(auth_token);
            // const secretVerify = verifyToken(secret_token); 
        
            const _time = (new Date(authVerify.expiresTime)).getTime();
            const _diff = (currentTime - _time)/1000 ;
            console.log("_time",_time,_diff,CONSTANTS.expireTime,_diff < CONSTANTS.expireTime)
            if(_diff < CONSTANTS.expireTime){
                const {refreshToken,authToken} = ReGenKey({userId:authVerify.userId})
                //* secure
                req.user_info = authVerify;
                res.setHeader('secret_token',refreshToken)
                res.setHeader('auth_token',authToken)
            }else{
                // not secure
                res.setHeader('secret_token',null)
                res.setHeader('auth_token',null)
            }
            
            // console.log("authVerify33",authVerify)
            
        }else{
            res.setHeader('secret_token',null)
            res.setHeader('auth_token',null)
            return res.status(400).send({text:TEXTS.creds_error})
        }
        // move to next task
        next()
    } catch (error) {
        res.setHeader('secret_token',null)
        res.setHeader('auth_token',null)
        return res.status(400).send({text:TEXTS.general_error,message:error.message})
    }
}


exports.readerAuth=async(req,res,next)=>{
    try {
        const {auth_token,secret_token} = req.headers;
        
        const currentTime = (new Date()).getTime() ;

        if(auth_token && secret_token){
            
            const authVerify = verifyToken(auth_token);
            const secretVerify = verifyToken(secret_token); 
        
            const _time = (new Date(authVerify.expiresTime)).getTime();
            const _diff = (currentTime - _time)/1000 ;
            console.log("_time",_time,_diff,CONSTANTS.expireTime,_diff < CONSTANTS.expireTime)
            if(_diff < CONSTANTS.expireTime){
                const {refreshToken,authToken} = ReGenKey({userId:authVerify.userId})
                //* secure
                res.setHeader('secret_token',refreshToken)
                res.setHeader('auth_token',authToken)
            }else{
                // not secure
                
                res.setHeader('secret_token',null)
                res.setHeader('auth_token',null)
            }
            
            // console.log("authVerify33",authVerify)
            
        }else{
            res.setHeader('secret_token',null)
            res.setHeader('auth_token',null)
        }

        // move to next task
        next()
    } catch (error) {
        console.log(error)
        next()
        
    }
}