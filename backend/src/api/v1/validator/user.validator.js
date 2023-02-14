const Joi = require('joi');

exports.signupValidator = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
    name: Joi.string().required()
});

exports.loginValidator = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
    
});