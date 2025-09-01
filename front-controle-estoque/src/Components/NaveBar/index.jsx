import { useNavigate } from "react-router-dom";
import Button from "../Button"; // seu componente Button
import './NaveBar.css';

const NaveBar = () => {
  const navigate = useNavigate();

  return (
    <nav className='navegacao'>
      <Button text="Produto" onClick={() => navigate("/produto")} />
      <Button text="Categoria" onClick={() => navigate("/categoria")} />
      <Button text="Fornecedor" onClick={() => navigate("/fornecedor")} />
    </nav>
  );
}

export default NaveBar;
