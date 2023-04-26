const sql = require("mssql");
require("dotenv").config();

const sqlConfig = sql.connect({
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DB,
});
