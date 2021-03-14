var express = require("express");
var app = express();
var path = require('path');
const port = process.env.port || 3000;

const users = require("./routes/users");
const login = require("./routes/login");
const items = require("./routes/items");
const collections = require("./routes/collections");
const {isAuthenticated, isAdmin} = require('./middleware/auth');


app.get("/", (req, res) => {
  res.send("root")
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", users);
app.use("/login", login);
app.use("/items", items);
app.use("/collections", isAuthenticated, collections);

app.listen(port);

module.exports = app;