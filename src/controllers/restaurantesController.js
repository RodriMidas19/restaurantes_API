const restauranteModel = require("../models/restaurantesModel");

const getRestaurantes = async (request, response) => {
  let resp = await restauranteModel.getRestaurantes();
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
  let id = request.params.id_reserva;
  let status = request.params.status;
  let resp = await restauranteModel.updateStatusReserva(id, status);
  return response.status(200).json(resp);
};

module.exports = {
  getRestaurantes,
  clienteReserva,
  getReservas,
  getMesas,
  adminReserva,
  updateStatusReserva,
};
