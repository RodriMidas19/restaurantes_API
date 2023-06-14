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
const deleteClient = async (id) => {
  const pool = await connection;
  await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM tbl_clientes WHERE id_cliente = @id");
  const resp = { message: `Cliente ${id} eliminado com sucesso` };
  return resp;
};

const getAllClients = async () => {
  const pool = await connection;
  const result = await pool.request().query("SELECT * FROM tbl_clientes");
  return result;
};

const getAllFunc = async () => {
  const pool = await connection;
  const result = await pool
    .request()
    .query(
      "SELECT num_funcionario,nome_funcionario,idade,telefone,email,nome_cargo as cargo from tbl_funcionarios inner join tbl_cargos on tbl_cargos.id_cargo = tbl_funcionarios.cargo"
    );
  return result;
};

const updateFunc = async (data) => {
  const pool = await connection;
  const result = await pool
    .request()
    .input("num", sql.VarChar(10), data.num)
    .input("nome", sql.VarChar(100), data.nome)
    .input("idade", sql.Int, data.idade)
    .input("telefone", sql.VarChar(9), data.telefone)
    .input("email", sql.VarChar(100), data.email)
    .input("cargo", sql.Int, data.cargo)
    .query(
      "UPDATE tbl_funcionarios SET nome_funcionario = @nome , idade = @idade , telefone = @telefone , email = @email , cargo = @cargo WHERE num_funcionario = @num"
    );

  const resp = { message: "Funcionário atualizado com sucesso." };
  return resp;
};

const deleteFunc = async (id_func) => {
  const pool = await connection;
  const result = await pool
    .request()
    .input("id", sql.VarChar(), id_func)
    .query("DELETE FROM tbl_funcionarios WHERE num_funcionario = @id");
  const resp = { message: "Funcionário eliminado" };
  return resp;
};

module.exports = {
  login,
  register,
  getUser,
  registerFunc,
  getAllClients,
  getAllFunc,
  deleteClient,
  updateFunc,
  deleteFunc,
};
