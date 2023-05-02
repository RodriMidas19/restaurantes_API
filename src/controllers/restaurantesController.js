const restauranteModel = require("../models/restaurantesModel");

const getRestaurantes = async (request, response) => {
  let resp = await restauranteModel.getRestaurantes();
  return response.status(201).json(resp);
};

module.exports = getRestaurantes;
