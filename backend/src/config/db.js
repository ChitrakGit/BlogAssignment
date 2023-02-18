const mongoose = require("mongoose");
const { MONGO_URI } = require("../constant/texts.constant");

const mongoURI =MONGO_URI
	

console.log("mongoURI", mongoURI);

exports.connectDb = async () => {
	
	if (mongoURI) {
		const conn = await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 40000
		});
		console.log(`MongoDB Connected: ${conn.connection.port}`);
	}
};
