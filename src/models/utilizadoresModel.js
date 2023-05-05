const connection = require("../connection");
const sql = require("mssql");
const bcrypt = require("bcrypt");

const login = async (user) => {
  const pool = await connection;

  const email = await pool
    .request()
    .input("email", sql.VarChar(100), user.email)
    .query("SELECT * FROM tbl_clientes Where email =  @email");
  const data = email.recordset[0];

  if (data == undefined || data == null) return "Email não existe.";
  if (await bcrypt.compare(user.password, data.password)) {
    let id = data.id_cliente;

    let resp = { code: 202, id: id, message: "Login realizado com sucesso" };

    return resp;
  } else {
    return "Senha Errada";
  }
};

const register = async (user) => {
  const pool = await connection;
  const password = await bcrypt.hash(user.password, 10);
  const result = await pool
    .request()
    .input("nome", sql.VarChar(50), user.nome)
    .input("data_nasc", sql.Date, user.data_nasc)
    .input("telefone", sql.VarChar(9), user.telefone)
    .input("morada", sql.VarChar(250), user.morada)
    .input("email", sql.VarChar(100), user.email)
    .input("password", sql.VarChar(250), password)
    .query(
      "INSERT INTO tbl_clientes (nome,data_nasc,telefone,morada,email,password) VALUES (@nome,@data_nasc,@telefone,@morada,@email,@password)"
    );

  return "Resgistado com Sucesso!";
};

module.exports = {
  login,
  register,
};
