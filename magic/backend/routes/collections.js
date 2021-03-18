var express = require('express');
var router = express.Router();

const config = require("../utils/config");
const { route } = require('./users');

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
.route("/")
.post((req, res) => {
    
    const body = req.body;

    knex('collections')
    .select('*')
    .where('user_id', '=', body.user_id)
    .andWhere('item_id', '=', body.item_id)
    .then((rows) => {
        if(rows.length > 0){
            knex('collections')
            .where('user_id', '=', body.user_id)
            .andWhere('item_id', '=', body.item_id)
            .increment('quantity', 1)
            .then(() => {
                res.status(201).json({ message: 'Incremented quantity of card' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ error: 'database error' });
            })
        } else {
            knex('collections')
            .insert({user_id: body.user_id, item_id: body.item_id, quantity: 1})
            .then(() => {
                res.status(201).json({ message: 'New card added' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ error: 'database error' })
            });
        }
    });
});

router
.route("/paginated/:set/:page/:user_id")
.get((req, res) => {

    const page = req.params.page;
    const set = req.params.set;
    const userId = req.params.user_id;

    knex.from('ncards')
    .join('collections', 'nid', '=', 'collections.item_id')
    .select('*')
    .where('collections.user_id', '=', userId)
    .andWhere('nset', '=', set)
    .orderBy('ncolor')
    .paginate({
        perPage: 20,
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