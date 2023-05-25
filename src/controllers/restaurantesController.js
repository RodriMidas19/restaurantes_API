const restauranteModel = require("../models/restaurantesModel");

const getRestaurantes = async (request, response) => {
  let resp = await restauranteModel.getRestaurantes();
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

module.exports = { getRestaurantes, clienteReserva, getReservas };
