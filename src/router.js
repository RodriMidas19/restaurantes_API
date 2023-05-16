const express = require("express");
require("dotenv").config();

const utilizadoresController = require("./controllers/utilizadoresController");
const restaurantesController = require("./controllers/restaurantesController");

const router = express.Router();

//Utilizadores and Funcionarios
router.post("/login", utilizadoresController.login);
router.post("/registerFunc", utilizadoresController.registerFunc);
router.post("/register", utilizadoresController.register);
router.get("/user/:id", utilizadoresController.getUser);

//Restaurantes
router.get("/restaurantes", restaurantesController.getRestaurantes);
module.exports = router;
