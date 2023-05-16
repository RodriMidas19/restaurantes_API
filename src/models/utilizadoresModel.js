const connection = require("../connection");
const sql = require("mssql");
const bcrypt = require("bcrypt");

const verify = async (password, bdPassword, id, user) => {
  if (await bcrypt.compare(password, bdPassword)) {
    let resp = { id: id, message: "Login realizado com sucesso", user: user };

    return resp;
  } else {
    let resp = { message: "Senha Errada." };
    return resp;
  }
};
const login = async (user) => {
  const pool = await connection;

  const email = await pool
    .request()
    .input("email", sql.VarChar(100), user.email)
    .query("SELECT * FROM tbl_clientes Where email =  @email");
  const data = email.recordset[0];
  console.log(data);

  const func = await pool
    .request()
    .input("email", sql.VarChar(100), user.email)
    .query("SELECT * FROM tbl_funcionarios WHERE email = @email");
  const funcData = func.recordset[0];
  console.log(funcData);

  if (data == undefined || data == null) {
    if (funcData == undefined || funcData == null) {
      let resp = { message: "Email não existe." };
      return resp;
    } else {
      const resp = verify(
        user.password,
        funcData.password,
        funcData.num_funcionario,
        "funcionário"
      );
      return resp;
    }
  } else {
    const resp = verify(
      user.password,
      data.password,
      data.id_cliente,
      "cliente"
    );
    return resp;
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

const registerFunc = async (user) => {
  const pool = await connection;
  const password = await bcrypt.hash(user.password, 10);
  const result = await pool
    .request()
    .input("num_funcionario", sql.VarChar(10), user.num_funcionario)
    .input("nome_funcionario", sql.VarChar(100), user.nome_funcionario)
    .input("idade", sql.Int, user.idade)
    .input("telefone", sql.VarChar(9), user.telefone)
    .input("email", sql.VarChar(100), user.email)
    .input("password", sql.VarChar(250), password)
    .input("cargo", sql.Int, user.cargo)
    .query(
      "INSERT INTO tbl_funcionarios (num_funcionario,nome_funcionario,idade,telefone,email,password,cargo) VALUES (@num_funcionario,@nome_funcionario,@idade,@telefone,@email,@password,@cargo)"
    );

  return "Resgistado com Sucesso!";
};

const getUser = async (user) => {
  const pool = await connection;
  const result = await pool
    .request()
    .input("id_cliente", sql.Int, user)
    .query("SELECT * FROM tbl_clientes WHERE id_cliente = @id_cliente");

  const data = result.recordset[0];
  return data;
};

module.exports = {
  login,
  register,
  getUser,
  registerFunc,
};
