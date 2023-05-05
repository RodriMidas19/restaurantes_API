const express = require("express");
require("dotenv").config();

const utilizadoresController = require("./controllers/utilizadoresController");
const restaurantesController = require("./controllers/restaurantesController");

const router = express.Router();

router.post("/login", utilizadoresController.login);
router.post("/register", utilizadoresController.register);
router.get("/restaurantes", restaurantesController.getRestaurantes);
module.exports = router;
