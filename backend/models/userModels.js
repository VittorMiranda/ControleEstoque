const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
    criadoEm: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Usuario', usuarioSchema);