var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../utils/config");

const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router
.route("/")
.get((req,res) => {
    res.send('test');
});

 router.post('/', (req, res, next) => {
    const body = req.body;
    if(!(body.username || body.password)) {
        return res.status(400).json(
            { error: 'invalid username or password' }
        );
    };

    knex.from('users').select('*').where('username', '=', body.username)
     .then((user) => {
         if(user.length === 0){
             return res.status(401).json(
                 { error: 'invalid username or password' }
             );
         }

         const tempUser = user[0];

         bcrypt.compare(body.password, tempUser.password)
             .then((passwordCorrect) => {
                 if(!passwordCorrect){
                     return res.status(401).json(
                         { error: 'invalid password' }
                     );
                 }

                 const userForToken = {
                     username: tempUser,
                     userId: tempUser.id,
                     userRole: tempUser.role
                 }

                 const token = jwt.sign(userForToken, config.SECRET)
                 res 
                 .status(200)
                 .send({token, userId: tempUser.id, username: tempUser.username, userRole: tempUser.role})
             });
     })
     .catch((err) => {
         console.log(err);
         return res.status(500).json(
             { error: 'invalid username or password' }
         );
     })
 });

module.exports = router;