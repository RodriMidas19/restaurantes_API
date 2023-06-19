const restauranteModel = require("../models/restaurantesModel");

const getRestaurantes = async (request, response) => {
  let resp = await restauranteModel.getRestaurantes();
  return response.status(200).json(resp);
};

const getCargos = async (request, response) => {
  let resp = await restauranteModel.getCargos();
  return response.status(200).json(resp);
};

const getMesas = async (request, response) => {
  let data = {
    hora: request.body.hora,
    data: request.body.data,
    restaurante: request.body.restaurante,
  };
  let resp = await restauranteModel.getMesas(data);
  return response.status(200).json(resp);
};

const getReservas = async (request, response) => {
  let resp = await restauranteModel.getReservas();
  return response.status(200).json(resp);
};

const clienteReserva = async (request, response) => {
  let data = {
    num_restaurante: request.body.num_restaurante,
    num_pessoas: request.body.num_pessoas,
    data_reserva: request.body.data_reserva,
    situacao: request.body.situacao,
    hora_reserva: request.body.hora_reserva,
    id_cliente: request.body.id_cliente,
  };
  let resp = await restauranteModel.reservaCliente(data);
  return response.status(201).json(resp);
};
const adminReserva = async (request, response) => {
  let mesas = request.body.num_mesa;
  let data = {
    id_reserva: request.body.id_reserva,
    data_reserva: request.body.data_reserva,
    hora_reserva: request.body.hora_reserva,
  };
  let resp = await restauranteModel.reservaAdmin(data, mesas);
  return response.status(201).json(resp);
};

const updateStatusReserva = async (request, response) => {
  let id = request.body.id;
  let status = request.body.status;
  let resp = await restauranteModel.updateStatusReserva(id, status);
  return response.status(200).json(resp);
};

const deleteReserva = async (request, response) => {
  let id = request.params.id;
  let resp = await restauranteModel.deleteReserva(id);
  return response.status(202).json(resp);
};

const getAllProducts = async (request, response) => {
  let resp = await restauranteModel.getAllProducts();
  return response.status(200).json(resp);
};

const addProduct = async (request, response) => {
  let data = {
    nome: request.body.nome,
    preco: request.body.preco,
    disponivel: request.body.disponivel,
    img: request.body.img,
  };
  let resp = await restauranteModel.addProduct(data);
  return response.status(200).json(resp);
};

const addEncomenda = async (request, response) => {
  let produtos = request.body.produtos;
  let data = {
    funcionario: request.body.funcionario,
    preco: request.body.preco,
    cliente: request.body.cliente,
    num_restaurante: request.body.num_restaurante,
    morada: request.body.moradaA,
  };
  let resp = response.status(200).json(resp);
};

module.exports = {
  getRestaurantes,
  clienteReserva,
  getReservas,
  getMesas,
  adminReserva,
  updateStatusReserva,
  deleteReserva,
  getCargos,
  addProduct,
  getAllProducts,
  addEncomenda,
};
