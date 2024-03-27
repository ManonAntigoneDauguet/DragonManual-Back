const { Client } = require('pg');

require('dotenv').config()

const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

module.exports.createConnection = async () => {
    client.connect()
        .then(() => console.log(`Database connected !`))
        .catch(err => console.error('Database connection error', err.stack));
}

module.exports.connexion = { client }