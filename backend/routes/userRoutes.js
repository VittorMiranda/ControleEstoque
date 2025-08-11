const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/userControllers");

// Teste da API
router.get("/", usuarioController.test);

// Criar usuário
router.post("/registrar", usuarioController.create);

// Autenticar usuário
router.post("/login", usuarioController.autentica);

module.exports = router;
