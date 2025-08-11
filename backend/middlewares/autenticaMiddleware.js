const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Acesso negado: token não fornecido." });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Token inválido ou expirado." });
    }
    req.user = user; // adiciona os dados do token (id, role) na requisição
    next();
  });
}

module.exports = authenticateJWT;
