const poolPromise = require("../connection");
const sql = require("mssql");

const getCargos = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM tbl_cargos");
  return result;
};

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
      "select num_reserva,tbl_restaurantes.nome,num_pessoas,data_reserva,tbl_mesaSituacao.situacao,hora_reserva,tbl_clientes.nome as nomeCliente from tbl_reservas inner join tbl_restaurantes on tbl_restaurantes.num_restaurante = tbl_reservas.num_restaurante inner join tbl_clientes on tbl_clientes.id_cliente = tbl_reservas.id_cliente inner join tbl_mesaSituacao on tbl_mesaSituacao.num_situacao = tbl_reservas.situacao"
    );
  const data = result;
  return data;
};

const getMesas = async (data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("horaC", sql.VarChar(50), data.hora)
    .input("dataC", sql.VarChar(250), data.data)
    .input("restauranteC", sql.Int, data.restaurante)
    .query(
      "exec getMesasDisponiveis @hora = @horaC, @data = @dataC, @restaurante = @restauranteC"
    );

  return result;
};

const reservaCliente = async (data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("num_restaurante", sql.Int, data.num_restaurante)
    .input("num_pessoas", sql.Int, data.num_pessoas)
    .input("data_reserva", sql.VarChar(50), data.data_reserva)
    .input("situacao", sql.Int, 1)
    .input("hora_reserva", sql.VarChar(50), data.hora_reserva)
    .input("id_cliente", sql.Int, data.id_cliente)
    .query(
      "INSERT INTO tbl_reservas (num_restaurante,num_pessoas,data_reserva,situacao,hora_reserva,id_cliente) VALUES (@num_restaurante,@num_pessoas,@data_reserva,@situacao,@hora_reserva,@id_cliente)"
    );

  const resp = { message: "Reserva realizada com sucesso." };
  return resp;
};

const reservaAdmin = async (data, mesas) => {
  const pool = await poolPromise;
  for (let i = 0; i < mesas.length; i++) {
    const result = await pool
      .request()
      .input("num_mesaC", sql.VarChar(10), mesas[i].name)
      .input("id_reservaC", sql.Int, data.id_reserva)
      .input("data_reservaC", sql.VarChar(50), data.data_reserva)
      .input("hora_reservaC", sql.VarChar(50), data.hora_reserva)
      .query(
        "exec insertRMAdmin @num_mesa = @num_mesaC,@id_reserva = @id_reservaC,@data_reserva = @data_reservaC,@hora_reserva = @hora_reservaC"
      );
  }

  const resp = { message: "Mesas reservadas com sucesso" };
  return resp;
};

const updateStatusReserva = async (id, status) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("num_reserva", sql.Int, id)
    .input("status", sql.Int, status)
    .query(
      "UPDATE tbl_reservas SET situacao = @status WHERE num_reserva = @num_reserva"
    );
  const resp = { message: "Reserva atualizada com sucesso" };
  return resp;
};

const deleteReserva = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM tbl_mesasReservadas WHERE id_reserva = @id");

  const resp = { message: "Reserva rejeitada com sucesso." };
  return resp;
};

const getAllProducts = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM tbl_produtos");
  return result;
};

const addProduct = async (data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("nome_produto", sql.VarChar(100), data.nome)
    .input("preco", sql.Int, data.preco)
    .input("img", sql.VarChar(sql.MAX), data.img)
    .query(
      "INSERT INTO tbl_produtos(nome_produto,preco,prod_imagem) VALUES(@nome_produto,@preco,@img)"
    );

  const resp = { message: "Produto adicionado com sucesso" };
  return resp;
};

const addEncomenda = async (data, dataC) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("funcionario", sql.VarChar(10), dataC.funcionario)
    .input("preco_total", sql.Int, dataC.preco)
    .input("cliente", sql.Int, dataC.cliente)
    .input("num_restaurante", sql.Int, dataC.num_restaurante)
    .input("moradaA", sql.VarChar(255), dataC.moradaA)
    .input("situacao", sql.Int, dataC.situacao)
    .query(
      "Insert into tbl_encomendas(funcionario,preco_total,cliente,num_restaurante,morada_alternativa,situacao) values(@funcionario,@preco_total,@cliente,@num_restaurante,@moradaA,@situacao)"
    );

  const encomenda = await pool
    .request()
    .query(
      "SELECT TOP 1 num_encomenda From tbl_encomendas ORDER BY  num_encomenda DESC"
    );
  const id = encomenda.recordset[0].num_encomenda;
  for (let i = 0; i < data.length; i++) {
    const result = await pool
      .request()
      .input("num_encomenda", sql.Int, id)
      .input("num_produto", sql.Int, data[i].id)
      .input("quant", sql.Int, data[i].quant)
      .query(
        "INSERT INTO tbl_prodEnc(num_encomenda,num_produto,quantidade_produto) VALUES (@num_encomenda, @num_produto, @quant)"
      );
  }

  const resp = { message: "Encomenda solicitada com Sucesso" };

  return resp;
};

const updateStatusEncomenda = async (id, situacao) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id_encomenda", sql.Int, id)
    .input("situacao", sql.Int, situacao)
    .query(
      "UPDATE tbl_encomendas SET situacao = @situacao WHERE num_encomenda = @id_encomenda"
    );
  const resp = { message: "Encomenda Atualizada com Sucesso" };
  return resp;
};
module.exports = {
  getRestaurantes,
  reservaCliente,
  getReservas,
  getMesas,
  reservaAdmin,
  updateStatusReserva,
  deleteReserva,
  getCargos,
  addProduct,
  getAllProducts,
  addEncomenda,
  updateStatusEncomenda,
};
