const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./config/db");

const app = express();

dotenv.config();

const PORT = 3000;

app.use(cors()); // liberando CORS para todas as origens
app.use(express.json());

// Importa o router
const userRoutes = require("./routes/userRoutes");

// Usa o router
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
