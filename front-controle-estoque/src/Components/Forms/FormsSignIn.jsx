import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⚠ import necessário
import Inputs from "../Inputs";
import Button from "../Button";
import { login } from "../../Services/auth";
import './Forms.css';

const FormsSignIn = () => {
  const navigate = useNavigate(); // ⚠ definindo o navigate aqui
  const [usuario, setUsuario] = useState({
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
      const data = await login(usuario.email, usuario.senha);

      // ⚠ Salva o nome do usuário para o Header
      if (data.nome) {
        localStorage.setItem("usuario", JSON.stringify({ nome: data.nome }));
      }

      alert("Login realizado com sucesso!");
      navigate("/home"); // ⚠ redireciona para home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <Inputs label="Email" name="email" value={usuario.email} onChange={handleChange} />
      <Inputs label="Senha" type="password" name="senha" value={usuario.senha} onChange={handleChange} />

      <Button text="Entrar" type="submit" />

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <p>Não tem uma conta? <a href="/signup">Cadastre-se</a></p>
      </div>
    </form>
  );
};

export default FormsSignIn;
