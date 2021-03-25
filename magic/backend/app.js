var express = require("express");
var app = express();
var path = require('path');
const port = process.env.port || 3000;

const users = require("./routes/users");
const login = require("./routes/login");
const items = require("./routes/items");
const sets = require("./routes/sets");
const collections = require("./routes/collections");
const decks = require("./routes/decks");
const {isAuthenticated, isAdmin} = require('./middleware/auth');
const { request } = require("express");


app.get("/", (req, res) => {
  res.send("root")
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", users);
app.use("/sets", sets);
app.use("/login", login);
app.use("/items", items);
app.use("/collections", isAuthenticated, collections);
app.use("/decks", isAuthenticated, decks);

app.listen(port);

module.exports = app;