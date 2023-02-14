const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    user_id:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:"users"
	},
	heading: {
		type: String,
        require:true
	},
    text: {
		type: String,
        require:true,
	},
    image: {
		type: Object,
        require:true
	},
	
}, { timestamps: true });

exports.BlogModel = model("blogs", blogSchema);
 