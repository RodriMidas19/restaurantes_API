const restauranteModel = require("../models/restaurantesModel");

const getRestaurantes = async (request, response) => {
  let resp = await restauranteModel.getRestaurantes();
  return response.status(200).json(resp);
};

module.exports = { getRestaurantes };
