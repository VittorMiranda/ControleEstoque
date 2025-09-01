const express = require("express");
const router = express.Router();
const fornecedorController = require("../controllers/fornecedorControllers");
const authenticateJWT = require("../middlewares/autenticaMiddleware");
const authorize = require("../middlewares/restricaoMiddleware");

router.post("/", authenticateJWT, authorize(['admin']), fornecedorController.criar);
router.get("/", fornecedorController.listar);
router.get("/:id", fornecedorController.buscarPorId);
router.put("/:id", authenticateJWT, authorize(['admin']), fornecedorController.atualizar);
router.delete("/:id", authenticateJWT, authorize(['admin']), fornecedorController.deletar);

module.exports = router;
