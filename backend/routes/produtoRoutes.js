const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoControllers");
const authenticateJWT = require("../middlewares/autenticaMiddleware");
const authorize = require("../middlewares/restricaoMiddleware");

router.post("/", authenticateJWT, authorize(['admin']), produtoController.criar);
router.get("/", produtoController.listar);
router.get("/:id", produtoController.buscarPorId);
router.put("/:id", authenticateJWT, authorize(['admin']), produtoController.atualizar);
router.delete("/:id", authenticateJWT, authorize(['admin']), produtoController.deletar);

module.exports = router;
