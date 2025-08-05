const express = require("express");
const userControllers = require("../controllers/userControllers");
const userRoutes = express.Router();

userRoutes.post("/auth/register", userControllers.create);
userRoutes.post("/auth/login", userControllers.autentica);
userRoutes.get('/', userControllers.test);

module.exports = userRoutes;