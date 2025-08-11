const express = require("express");
const router = express.Router();
const movimentoController = require("../controllers/movimentacaoControllers");

router.post("/", movimentoController.criar);
router.get("/", movimentoController.listar);
router.get("/:id", movimentoController.buscarPorId);
router.put("/:id", movimentoController.atualizar);
router.delete("/:id", movimentoController.deletar);

module.exports = router;
