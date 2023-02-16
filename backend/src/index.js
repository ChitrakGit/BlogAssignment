const express = require("express");
const { connectDb } = require("./config/db");
// import {app as subRoute} from "./api/v1/routes"
const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization, user-key"
		);
		return res.status(200).json({});
	}
	next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json())

connectDb()
app.get("/test", (req, res) => {
	return res.send("hello world from node express");
});

app.use("/api/v1", require("./api/v1/routes/index"));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server stared:-> localhost:${PORT}`)
})