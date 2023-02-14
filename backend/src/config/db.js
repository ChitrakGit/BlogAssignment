const mongoose = require("mongoose");

const mongoURI ="mongodb://localhost:27017/BLOG_ASSIGNMENT"
	

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
