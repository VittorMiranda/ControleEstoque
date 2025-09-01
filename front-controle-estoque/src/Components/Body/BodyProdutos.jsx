import FormProduto from '../Forms/FormsProduto';
import { useParams, useLocation } from 'react-router-dom';
import './Body.css';

const BodyProdutos = () => {
  const { id } = useParams(); // pega o ID do produto se for edição
  const location = useLocation();
  const produtoEdit = location.state?.produto; // opcional, passamos o produto via navigate

  return (
    <main className='corpo'>
      <div className='principal'>
        <FormProduto produtoEdit={produtoEdit} produtoId={id} />
      </div>
    </main>
  );
};

export default BodyProdutos;
