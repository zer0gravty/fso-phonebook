const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const configs = {
    MONGO_DB_NAME,
    MONGO_URL,
    MONGO_USER,
    MONGO_PASSWORD,
};

module.exports = configs;
