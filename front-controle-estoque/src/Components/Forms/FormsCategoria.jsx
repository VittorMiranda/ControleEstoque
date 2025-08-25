import { useState } from "react";
import Inputs from "../Inputs";
import Button from "../Button";
import './Forms.css';

const FormCategoria = () => {
  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/categoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoria)
    })
      .then(res => res.json())
      .then(data => {
        alert("Categoria cadastrada com sucesso!");
        console.log(data);

        // Limpar formulário
        setCategoria({ nome: "", descricao: "" });
      })
      .catch(err => console.error("Erro:", err));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Cadastro de Categoria</h3>

      <Inputs label="Nome" name="nome" value={categoria.nome} onChange={handleChange} />
      <Inputs label="Descrição" name="descricao" value={categoria.descricao} onChange={handleChange} />

      <Button text="Cadastrar Categoria" type="submit" />
    </form>
  );
};

export default FormCategoria;
