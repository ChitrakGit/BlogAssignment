const Joi = require('joi');

exports.addBlogValidator = Joi.object({
	heading: Joi.string().required(),
	text: Joi.string().required()
});