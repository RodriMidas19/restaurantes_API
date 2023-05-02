const connection = require("../connection");

const getRestaurantes = async (request, response) => {
  const pool = await connection;
  const result = await pool.request().query("SELECT * FROM tbl_restaurantes");
  return result;
};

module.exports = getRestaurantes;
