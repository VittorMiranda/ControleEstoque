import { useState } from "react";
import Inputs from "../Inputs";
import Button from "../Button";
import './Forms.css';
import { useAuth } from '../../Contexts/AuthContext';

const FormCategoria = () => {
  const { token } = useAuth();
  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/categoria", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(categoria)
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.msg || "Erro ao cadastrar categoria");
        console.error("Erro do backend:", data);
        return;
      }
  
      alert("Categoria cadastrada com sucesso!");
      setCategoria({ nome: "", descricao: "" });
  
    } catch (err) {
      console.error("Erro de rede:", err);
      alert("Erro ao conectar com o servidor.");
    }
  };
  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Cadastro de Categoria</h3>

      <Inputs label="Nome" name="nome" value={categoria.nome} onChange={handleChange} />
      <Inputs label="Descrição" name="descricao" value={categoria.descricao} onChange={handleChange} />

      <Button text="Cadastrar" type="submit" />
    </form>
  );
};

export default FormCategoria;
