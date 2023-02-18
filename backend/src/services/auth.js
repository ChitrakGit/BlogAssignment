const JWT = require('jsonwebtoken');
const { CONSTANTS } = require('../constant/texts.constant');


exports.GenKey = (creds)=>{
    try {
        const expireTime = (new Date()).getTime() + CONSTANTS.expireTime ;
        const _creds = {...creds,expiresTime:expireTime} 
        const refreshToken = JWT.sign(_creds,process.env.JWT_TOKEN_KEY)
        const authToken = JWT.sign(_creds,process.env.JWT_TOKEN_KEY,{expiresIn: CONSTANTS.expireTime })
        return {refreshToken,authToken};
    } catch (error) {
        throw error 
    }
}

exports.ReGenKey = (creds)=>{
    try {
        const expireTime = (new Date()).getTime() + CONSTANTS.expireTime ;
        const _creds = {...creds,expiresTime:expireTime}
        const refreshToken = JWT.sign(_creds,process.env.JWT_TOKEN_KEY)
        const authToken = JWT.sign(_creds,process.env.JWT_TOKEN_KEY,{expiresIn: CONSTANTS.expireTime })
        return {refreshToken,authToken};
    } catch (error) {
        throw error
    }
    
}


exports.verifyToken = (token)=>{
    try {
        const decoded = JWT.verify(token, process.env.JWT_TOKEN_KEY)
        
        return decoded;
    } catch (error) {
        throw error
    }
    
}