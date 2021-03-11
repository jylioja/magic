var express = require('express');
var router = express.Router();
const { attachPaginate } = require('knex-paginate');
attachPaginate();

const config = require("../utils/config");

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
.route("/paginated/:page")
.get((req, res) => {
    const page = req.params.page;
    console.log(page, 'asdasdasd');

    knex.from('ncards').select('*').orderBy('ncolor').paginate({
        perPage: 20,
        currentPage: page
    }).then((rows) => {
        console.log(rows);
        const newRows = rows.data.map(card => ({...card, imageurl: `https://bucket-of-magic.s3.eu-north-1.amazonaws.com/KHM/${card.nname.replace(/\s/g, '+')}.full.jpg`}));
        res.send(newRows);
    })
});

module.exports = router;