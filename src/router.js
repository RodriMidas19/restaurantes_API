const express = require("express");
require("dotenv").config();

const utilizadoresController = require("./controllers/utilizadoresController");
const restaurantesController = require("./controllers/restaurantesController");

const router = express.Router();

//Utilizadores and Funcionarios

//GET
router.get("/clientes", utilizadoresController.getAllClients);
router.get("/user/:id", utilizadoresController.getUser);
router.get("/funcionarios", utilizadoresController.getAllFuncionarios);

router.post("/login", utilizadoresController.login);
router.post("/registerFunc", utilizadoresController.registerFunc);
router.post("/register", utilizadoresController.register);

//Restaurantes
router.get("/reservas", restaurantesController.getReservas);
router.post("/reservaCliente", restaurantesController.clienteReserva);
router.get("/restaurantes", restaurantesController.getRestaurantes);
module.exports = router;
