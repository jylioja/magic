var express = require('express');
var router = express.Router();

const config = require("../utils/config");

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
.route("/")
.get((req, res) => {
    knex('nsets')
    .select('*')
    .then((rows) => {
        res.json(rows);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(
            { error: 'datbase error' }
        );
    })
});

module.exports = router;