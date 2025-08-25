import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../Inputs";
import Button from "../Button";
import './Forms.css';

const FormsSignUp = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Erro ao cadastrar usuário");
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/"); // Redireciona para login
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Cadastro de Usuário</h3>

      <Inputs label="Nome" name="nome" value={usuario.nome} onChange={handleChange} />
      <Inputs label="Email" name="email" value={usuario.email} onChange={handleChange} />
      <Inputs label="Senha" type="password" name="senha" value={usuario.senha} onChange={handleChange} />

      <Button text="Cadastrar" type="submit" />

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <p>Já tem uma conta? <a href="/signin">Faça login</a></p>
      </div>
    </form>
  );
};

export default FormsSignUp;
