// middlewares/authorizeRole.js
function authorize(roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Acesso negado: permissão insuficiente." });
      }
      next();
    };
  }
  
  module.exports = authorize;
  