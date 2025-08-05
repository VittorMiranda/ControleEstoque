const movimentoSchema = new mongoose.Schema({
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    tipo: { type: String, enum: ['entrada', 'saida'], required: true },
    quantidade: { type: Number, required: true, min: 1 },
    data: { type: Date, default: Date.now },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    observacao: { type: String }
  });
  
  module.exports = mongoose.model('Movimento', movimentoSchema);
  