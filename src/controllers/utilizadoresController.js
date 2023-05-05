const utilizadoresModel = require("../models/utilizadoresModel");

const login = async (request, response) => {
  let user = { email: request.body.email, password: request.body.password };
  let resp = await utilizadoresModel.login(user);
  console.log(resp);
  return response.status(202).json(resp);
};

const register = async (request, response) => {
  let user = {
    nome: request.body.nome,
    data_nasc: request.body.data_nasc,
    telefone: request.body.telefone,
    morada: request.body.morada,
    email: request.body.email,
    password: request.body.password,
  };
  let resp = await utilizadoresModel.register(user);
  return response.status(201).json(resp);
};

module.exports = { login, register };
