require("dotenv").config();

const DATABASE = process.env.DATABASE;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const DIALECT = process.env.DIALECT;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_DOMAIN_NAME = process.env.S3_DOMAIN_NAME;
module.exports = {
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
  PORT,
  SECRET_KEY,
  S3_ACCESS_KEY_ID,
  S3_SECRET_KEY,
  S3_BUCKET_NAME,
  S3_DOMAIN_NAME,
};
