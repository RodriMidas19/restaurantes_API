const express = require("express");
require("dotenv").config();

const utilizadoresController = require("./controllers/utilizadoresController");
const restaurantesController = require("./controllers/restaurantesController");

const router = express.Router();

//Utilizadores and Funcionarios

router.get("/admin/:id", utilizadoresController.getAdmin);
router.get("/encomendas", utilizadoresController.getEncomendas);
router.put("/Upencomenda", restaurantesController.updateStatusEnc);

//GET
router.get("/clientes", utilizadoresController.getAllClients);
router.get("/user/:id", utilizadoresController.getUser);
router.get("/funcionarios", utilizadoresController.getAllFuncionarios);
router.get("/userR/:id", utilizadoresController.getReservaUser);
router.get("/userE/:id", utilizadoresController.UserEnc);
router.get("/userP/:id", utilizadoresController.UserProd);

router.put("/upCliente", utilizadoresController.updateClient);
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
router.post("/addEncomenda", restaurantesController.addEncomenda);
router.get("/categorias", restaurantesController.getCategorias);
router.get("/prodCat/:id", restaurantesController.getProdCat);
module.exports = router;
