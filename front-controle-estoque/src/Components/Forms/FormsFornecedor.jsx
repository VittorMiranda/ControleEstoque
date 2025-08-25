import { useState } from "react";
import Inputs from "../Inputs";
import Button from "../Button";
import './Forms.css';;

const FormFornecedor = () => {
  const [fornecedor, setFornecedor] = useState({
    nome: "",
    cnpj: "",
    telefone: "",
    email: "",
    endereco: {
      rua: "",
      numero: "",
      cidade: "",
      estado: "",
      cep: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se o campo for do endereço
    if (name.startsWith("endereco.")) {
      const campo = name.split(".")[1];
      setFornecedor({
        ...fornecedor,
        endereco: { ...fornecedor.endereco, [campo]: value }
      });
    } else {
      setFornecedor({ ...fornecedor, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/fornecedor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fornecedor)
    })
      .then(res => res.json())
      .then(data => {
        alert("Fornecedor cadastrado com sucesso!");
        console.log(data);

        // Limpar formulário
        setFornecedor({
          nome: "",
          cnpj: "",
          telefone: "",
          email: "",
          endereco: { rua: "", numero: "", cidade: "", estado: "", cep: "" }
        });
      })
      .catch(err => console.error("Erro:", err));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Cadastro de Fornecedor</h3>

      <Inputs label="Nome" name="nome" value={fornecedor.nome} onChange={handleChange} />
      <Inputs label="CNPJ" name="cnpj" value={fornecedor.cnpj} onChange={handleChange} />
      <Inputs label="Telefone" name="telefone" value={fornecedor.telefone} onChange={handleChange} />
      <Inputs label="Email" name="email" value={fornecedor.email} onChange={handleChange} />

      <h3>Endereço</h3>
      <Inputs label="Rua" name="endereco.rua" value={fornecedor.endereco.rua} onChange={handleChange} />
      <Inputs label="Número" name="endereco.numero" value={fornecedor.endereco.numero} onChange={handleChange} />
      <Inputs label="Cidade" name="endereco.cidade" value={fornecedor.endereco.cidade} onChange={handleChange} />
      <Inputs label="Estado" name="endereco.estado" value={fornecedor.endereco.estado} onChange={handleChange} />
      <Inputs label="CEP" name="endereco.cep" value={fornecedor.endereco.cep} onChange={handleChange} />

      <Button text="Cadastrar Fornecedor" type="submit" />
    </form>
  );
};

export default FormFornecedor;
