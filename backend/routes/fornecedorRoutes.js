const express = require("express");
const router = express.Router();
const fornecedorController = require("../controllers/fornecedorControllers");

router.post("/", fornecedorController.criar);
router.get("/", fornecedorController.listar);
router.get("/:id", fornecedorController.buscarPorId);
router.put("/:id", fornecedorController.atualizar);
router.delete("/:id", fornecedorController.deletar);

module.exports = router;
