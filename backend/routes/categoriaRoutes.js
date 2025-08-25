const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaControllers");
const authenticateJWT = require("../middlewares/autenticaMiddleware");
const authorize = require("../middlewares/restricaoMiddleware");

// Rotas que qualquer usuário logado pode acessar
router.get("/", categoriaController.listar);
router.get("/:id", categoriaController.buscarPorId);

// Rotas que somente admin pode acessar
router.post("/", categoriaController.criar);
router.put("/:id", categoriaController.atualizar);
router.delete("/:id",  categoriaController.deletar);

module.exports = router;
