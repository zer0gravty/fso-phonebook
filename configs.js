const dotenv = require('dotenv');

dotenv.config();

const { MONGO_URL } = process.env;
const { MONGO_DB_NAME } = process.env;
const { MONGO_USER } = process.env;
const { MONGO_PASSWORD } = process.env;

const configs = {
  MONGO_DB_NAME,
  MONGO_URL,
  MONGO_USER,
  MONGO_PASSWORD,
};

module.exports = configs;
