const express = require("express");
const restauranteController = require("./controllers/restaurantesController");
require("dotenv").config();

const router = express.Router();

//router.get("/restaurantes", restauranteController.getRestaurantes);

module.exports = router;
