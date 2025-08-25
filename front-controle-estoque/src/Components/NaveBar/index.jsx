import { Link } from 'react-router-dom';
import './NaveBar.css';

const NaveBar = () => {
  return (
    <nav className='navegacao'>
      <Link to="/">Home</Link>
      <Link to="/produto">Produto</Link>
      <Link to="/categoria">Categoria</Link>
      <Link to="/fornecedor">Fornecedor</Link>
    </nav>
  );
}

export default NaveBar;
