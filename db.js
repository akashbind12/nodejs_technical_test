const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
// console.log("DB_NAME:",process.env.DB_NAME)

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
