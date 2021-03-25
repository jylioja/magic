var express = require('express');
var router = express.Router();

const config = require("../utils/config");

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
.route("/deck/:deck_name")
.post((req, res) => {

    const body = req.body;

    knex('decks')
    .insert({user_id: body.user_id, item_id: body.item_id, name: body.deck_name})
    .where('name', '=', body.deck_name)
    .then(() => {
        res.status(201).json(
            { message: 'Card added to deck' }
        );
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(
            { error: 'database error' }
        );
    })
})

router
.route("/newDeck/:deck_name")
.post((req, res) => {

    const body = req.body;

    knex('decks')
    .insert({user_id: body.user_id, item_id: body.item_id, name: body.deck_name})
    .then(() => {
        res.status(201).json(
            { message: 'Created new deck' }
        );
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(
            { error: 'database error' }
        );
    })
})


router
.route("/:user_id")
.get((req, res) => {

    const userId = req.params.user_id;

    knex.from('decks')
    .select('*')
    .where('user_id', '=', userId)
    .then((rows) => {
        res.json(rows);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(
            { error: 'database error' }
        );
    })
});

module.exports = router;
