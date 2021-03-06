var express = require("express");
var app = express();
var path = require('path');
const port = process.env.port || 3001;

const users = require("./routes/users");

app.get("/", (req, res) => {
  res.send("root")
});

app.use("/users", users);

app.listen(port);

module.exports = app;