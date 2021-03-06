const { response } = require('express');
var express = require('express');
var router = express.Router();

const config = require("../utils/config");

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
  .route("/")
  .get((req, res) => {
    knex.from('users').select("*").then((rows) => {
      console.log(rows);
      res.json(rows)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(
        { error: 'database error in get '}
      )
    });
  })
  .post((req, res) => {
    //post
  });

module.exports = router;
