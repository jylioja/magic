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
        knex.from('ncards')
        .select('*')
        .where('nset', '=', set)
        .orderBy('ncolor')
        .paginate({
            perPage: 20,
            currentPage: page
        }).then((rows) => {
            console.log(rows.pagination);
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(
                { error: 'database error' }
            );
    });
});

module.exports = router;