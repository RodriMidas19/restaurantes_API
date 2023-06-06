const utilizadoresModel = require("../models/utilizadoresModel");

const getAllClients = async (request, response) => {
  let resp = await utilizadoresModel.getAllClients();
  return response.status(201).json(resp);
};

const deleteClient = async (request, response) => {
  let id = request.params.id;
  let resp = await utilizadoresModel.deleteClient(id);
  return response.status(202).json(resp);
};
const getAllFuncionarios = async (request, response) => {
  let resp = await utilizadoresModel.getAllFunc();
  return response.status(201).json(resp);
};

const login = async (request, response) => {
  let user = { email: request.body.email, password: request.body.password };
  let resp = await utilizadoresModel.login(user);
  console.log(resp);
  return response.status(202).json(resp);
};

const registerFunc = async (request, response) => {
  let user = {
    num_funcionario: request.body.num_funcionario,
    nome_funcionario: request.body.nome_funcionario,
    idade: request.body.idade,
    telefone: request.body.telefone,
    email: request.body.email,
    password: request.body.password,
    cargo: request.body.cargo,
  };
  let resp = await utilizadoresModel.registerFunc(user);
  return response.status(201).json(resp);
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

const getUser = async (request, response) => {
  let resp = await utilizadoresModel.getUser(request.params.id);
  return response.status(200).json(resp);
};

module.exports = {
  login,
  register,
  getUser,
  registerFunc,
  getAllClients,
  getAllFuncionarios,
  deleteClient,
};
