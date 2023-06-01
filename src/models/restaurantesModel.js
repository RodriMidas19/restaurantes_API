const poolPromise = require("../connection");
const sql = require("mssql");

const getRestaurantes = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM tbl_restaurantes");
  return result;
};

const getReservas = async () => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query(
      "select num_reserva,tbl_restaurantes.nome,num_pessoas,data_reserva,situacao,hora_reserva,tbl_clientes.nome as nomeCliente from tbl_reservas inner join tbl_restaurantes on tbl_restaurantes.num_restaurante = tbl_reservas.num_restaurante inner join tbl_clientes on tbl_clientes.id_cliente = tbl_reservas.id_cliente"
    );
  const data = result;
  return data;
};

const getMesas = async (data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("hora", varChar(250), data.hora)
    .input("data", varChar(250), data.data)
    .input("restaurante", Int, data.restaurante)
    .query("exec getMesasDisponiveis @hora @data @restaurante");

  return result;
};

const reservaCliente = async (data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("num_restaurante", sql.Int, data.num_restaurante)
    .input("num_pessoas", sql.Int, data.num_pessoas)
    .input("data_reserva", sql.VarChar(50), data.data_reserva)
    .input("situacao", sql.Bit, 0)
    .input("hora_reserva", sql.VarChar(50), data.hora_reserva)
    .input("id_cliente", sql.Int, data.id_cliente)
    .query(
      "INSERT INTO tbl_reservas (num_restaurante,num_pessoas,data_reserva,situacao,hora_reserva,id_cliente) VALUES (@num_restaurante,@num_pessoas,@data_reserva,@situacao,@hora_reserva,@id_cliente)"
    );

  const resp = { message: "Reserva realizada com sucesso." };
  return resp;
};

module.exports = { getRestaurantes, reservaCliente, getReservas, getMesas };
