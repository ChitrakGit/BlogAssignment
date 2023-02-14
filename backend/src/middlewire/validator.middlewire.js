const { TEXTS } = require("../constant/texts.constant");


exports.validator = (validationSchema , parseProperty = null) => {
	return async (req, res, next) => {
		try {
			let payload;
			console.log(req.body)
			if (parseProperty) {
				payload = JSON.parse(req.body[parseProperty]);
			} else {
				payload = req.body;
			}
			console.log(payload)
			const { error } = validationSchema.validate(payload);
			if (error) {
				throw error;
			}
			next();
		} catch (err) {
			// throw err;
			console.log(err)
			return res.status(400).json({ text:TEXTS.invalid_payload  });
		}
	};
};

