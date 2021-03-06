require('dotenv').config()

let PORT = process.env.DB_PORT
//let SECRET = process.env.SECRET

let DATABASE_OPTIONS = {
    client: process.env.DB_OPTIONS,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
}

module.exports = {
  DATABASE_OPTIONS,
  PORT
}