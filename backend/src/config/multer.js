const { default: mongoose } = require("mongoose");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const express = require("express");
const { MONGO_URI } = require("../constant/texts.constant");

const router = express.Router();

const mongoURI = MONGO_URI ;
const conn = mongoose.createConnection(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
} );

let gfs;
conn.once("open", () => {
	// init stream
	gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads"
	});
});

// create a storage to get or file information from html
// Storage
const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads"
				};

				resolve(fileInfo);
			});
		});
	}
});

///here is the upload funtion intialized
const _upload = multer({
	storage
});
module.exports.upload = multer({
	storage
}); ;
// module.exports = router;
exports.multerGFS = {
	gfs,
	_upload,
	router
};