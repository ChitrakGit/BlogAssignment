const express = require("express")

const app = express();

app.use("/user", require("./user/user.routes"));
app.use("/blog", require("./blogs/blogs.routes"));
app.use("/file", require("./viewFile/viewFile.routes"));

module.exports = app;