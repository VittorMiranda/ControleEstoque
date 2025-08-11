const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware para JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error(err));

// Rotas
const usuarioRoutes = require("./routes/userRoutes");
app.use("/usuarios", usuarioRoutes);

const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categoria", categoriaRoutes);

const fornecedorRoutes = require("./routes/fornecedorRoutes");
app.use("/fornecedor", fornecedorRoutes);

const movimentacaoRoutes = require("./routes/movimentacaoRoutes");
app.use("/movimentacao", movimentacaoRoutes);

const produtoRoutes = require("./routes/produtoRoutes");
app.use("/produto", produtoRoutes);



// Subir servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
