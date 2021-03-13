var express = require('express');
var router = express.Router();

const config = require("../utils/config");
const bcrypt = require('bcryptjs');

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
    const body = req.body;
    const saltRounds = 10;
    
    bcrypt.hash(body.password, saltRounds)
      .then((passwordHash) => {
        const user = {
          username: body.username,
          email: body.email,
          password: passwordHash,
          role: 'user'
        }

      knex('users')
      .count('username')
      .where('username', '=', user.username)
      .then((rows) => {
        if(rows[0].count > 0){
          return res.status(409).json(
            { error: 'already exists' }
          );
        }else{
          knex('users').insert(user)
          .then(() => {
            res.status(201).json({ message: "Added user" });
            });
          }
        }
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(
          { error: 'database error' }
        );
      });
    });
  });

module.exports = router;
