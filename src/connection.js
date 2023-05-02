const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

const config = {
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    trustedConnection: true,
  },
};

const connection = sql.connect(config, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});
module.exports = connection;
