import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../Inputs";
import Button from "../Button";
import { useAuth } from "../../Contexts/AuthContext";
import './Forms.css';

const FormsSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [usuario, setUsuario] = useState({ email: "", senha: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(usuario.email, usuario.senha);
      alert("Login realizado com sucesso!");
      navigate("/home");
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
