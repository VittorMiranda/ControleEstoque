const express = require("express");
const router = express.Router();
const movimentoController = require("../controllers/movimentacaoControllers");
const authenticateJWT = require("../middlewares/autenticaMiddleware");
const authorize = require("../middlewares/restricaoMiddleware");

router.post("/", authenticateJWT, authorize(['admin']), movimentoController.criar);
router.get("/", movimentoController.listar);
router.get("/:id", movimentoController.buscarPorId);
router.put("/:id", authenticateJWT, authorize(['admin']), movimentoController.atualizar);
router.delete("/:id", authenticateJWT, authorize(['admin']), movimentoController.deletar);

module.exports = router;
