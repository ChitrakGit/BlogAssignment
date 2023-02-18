const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { connectDb } = require("./config/db");
// import {app as subRoute} from "./api/v1/routes"
const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "auth_token, secret_token");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth_token, secret_token");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization, user-key, auth_token, secret_token"
		);
		return res.status(200).json({});
	}
	next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json())
// app.use(cookieParser());

const expireTime = 1000 * 60  ;
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:false,
//     cookie: { expires:expireTime, secure: true},
//     resave: false 
// }));

connectDb()


app.get("/test", (req, res) => {
	return res.send("hello world from node express");
});

app.use("/api/v1", require("./api/v1/routes/index"));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server stared:-> localhost:${PORT}`)
})