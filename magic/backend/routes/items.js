var express = require('express');
var router = express.Router();

const config = require("../utils/config");

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
.route("/")
.get((req, res) => {
    const body = req.body;
    console.log("asdasdasd", body);
    knex.from('ncards').select('*').then((rows) => {
        const newRows = rows.map(obj => 
            ({...obj, imageurl: `https://bucket-of-magic.s3.eu-north-1.amazonaws.com/KHM/${obj.nname.replace(/\s/g, '+')}.full.jpg`}));
        res.json(newRows);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(
            { error: 'database error in get' }
        );
    });
});

module.exports = router;