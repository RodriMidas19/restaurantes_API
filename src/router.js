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
router.delete("/deleteClient/:id", utilizadoresController.deleteClient);
router.post("/register", utilizadoresController.register);

router.post("/login", utilizadoresController.login);
router.post("/registerFunc", utilizadoresController.registerFunc);
router.put("/updateFunc", utilizadoresController.updateFunc);
router.delete("/deleteFunc/:id", utilizadoresController.deleteFunc);

//Restaurantes
router.get("/cargos", restaurantesController.getCargos);
router.get("/reservas", restaurantesController.getReservas);
router.post("/reservaCliente", restaurantesController.clienteReserva);
router.post("/reservasAdm", restaurantesController.adminReserva);
router.put("/Upreservas", restaurantesController.updateStatusReserva);
router.delete("/reservas/:id", restaurantesController.deleteReserva);
router.post("/mesas", restaurantesController.getMesas);
router.get("/restaurantes", restaurantesController.getRestaurantes);

//Produtos
router.get("/produtos", restaurantesController.getAllProducts);
router.post("/addProduct", restaurantesController.addProduct);
module.exports = router;
