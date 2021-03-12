var express = require('express');
var router = express.Router();
const { attachPaginate } = require('knex-paginate');
attachPaginate();

const config = require("../utils/config");

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
.route("/paginated/:set/:page")
.get((req, res) => {
    const page = req.params.page;
    const set = req.params.set;

    knex.from('ncards').select('*').where('nset', '=', set).orderBy('ncolor').paginate({
        perPage: 10,
        currentPage: page
    }).then((rows) => {
        console.log(rows.pagination);
        const newRows = rows.data.map(card => ({...card, imageurl: `https://bucket-of-magic.s3.eu-north-1.amazonaws.com/KHM/${card.nname.replace(/\s/g, '+')}.full.jpg`}));
        res.json(newRows);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(
            { error: 'database error' }
        );
    })
});

module.exports = router;