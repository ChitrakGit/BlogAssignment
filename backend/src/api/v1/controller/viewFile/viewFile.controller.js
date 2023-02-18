const { default: mongoose } = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const { MONGO_URI } = require("../../../../constant/texts.constant");

const mongoURI = MONGO_URI ;
const conn = mongoose.createConnection(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
} );

let gfs ;
exports.gfs=gfs;
conn.once("open", () => {
	// init stream
	gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads"
	});
});

exports.viewFile = async (req, res) => {
	const file = gfs
		.find({
			filename: req.params.filename
		})
		.toArray((err, files) => {
			if (!files || files.length === 0) {
				return res.status(404).json({
					err: "no files exist"
				});
			}
			gfs.openDownloadStreamByName(req.params.filename).pipe(res);
		});
};