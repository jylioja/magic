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
    .count('user_id')
    .where('user_id', '=', body.userId)
    .then((rows) => {
        if(rows[0].count > 0){
            knex('collections').insert(body.cardId).where('user_id', '=', body.userId)
            .then(() => {
                res.status(201).json({ message: "card added to collection" });
            })
            .catch((err) => {
                res.status(500).json({ error: 'database error' })
            })
        }else{
            const newCollection = {
                user_Id: body.userId,
                cards_ids: body.cardId,
            };
            knex('collections').insert(newCollection)
            .then(() => {
                res.status(201).json({ message: 'New collection added' });
            })
            .catch((err) => {
                res.status(500).json({ error: 'database error' })
            })
        }
    })
})

module.exports = router;