const fornecedorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cnpj: { type: String },
    telefone: { type: String },
    email: { type: String },
    endereco: {
      rua: String,
      numero: String,
      cidade: String,
      estado: String,
      cep: String
    }
  });
  
  module.exports = mongoose.model('Fornecedor', fornecedorSchema);
  