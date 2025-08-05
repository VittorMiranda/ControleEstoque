const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  codigoBarras: { type: String, unique: true, sparse: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  fornecedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornecedor' },
  quantidade: { type: Number, required: true, min: 0 },
  unidade: { type: String, required: true, enum: ['un', 'kg', 'L', 'mL', 'g'] },
  precoCompra: { type: mongoose.Schema.Types.Decimal128, required: true },
  precoVenda: { type: mongoose.Schema.Types.Decimal128, required: true },
  dataValidade: { type: Date },
  imagemUrl: { type: String },
  ativo: { type: Boolean, default: true },
  dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produto', produtoSchema);