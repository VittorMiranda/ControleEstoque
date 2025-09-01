import './Card.css';
import placeholderImg from '../../assets/placeholder.png';
import TrashIcon from "../../assets/trash.svg";
import EditIcon from "../../assets/edit.svg";
import { useNavigate } from 'react-router-dom';

const Card = ({ produto, onDelete }) => {
  const navigate = useNavigate();
  const imagem = produto?.imagemUrl || placeholderImg;
  const precoVenda = produto?.precoVenda
    ? parseFloat(produto.precoVenda.toString()).toFixed(2)
    : '0.00';

  const handleEdit = () => {
    navigate(`/produto/editar/${produto._id}`, { state: { produto } });
  };

  return (
    <div className='card'>
      <div className="icons">
        <button className="icon-button" onClick={() => onDelete(produto._id)}>
          <img src={TrashIcon} alt="Excluir item"/>
        </button>
        <button className="icon-button" onClick={handleEdit}>
          <img src={EditIcon} alt="Editar item"/>
        </button>
      </div>
      
      <img src={imagem} alt={produto?.nome || 'Produto'} />
      <h3>{produto?.nome || 'Produto'}</h3>

      <h4>Descrição:</h4>
      <p className="scrollable-text">{produto?.descricao || '-'}</p>

      <h4>Código de Barras:</h4>
      <p>{produto?.codigoBarras || '-'}</p>

      <h4>Categoria:</h4>
      <p>{produto?.categoria?.nome || '-'}</p>

      <h4>Fornecedor:</h4>
      <p>{produto?.fornecedor?.nome || '-'}</p>

      <h4>Quantidade:</h4>
      <p>{produto?.quantidade || 0} {produto?.unidade || 'un'}</p>

      <h4>Preço de Venda:</h4>
      <p>R$ {precoVenda}</p>

      {produto?.dataValidade && (
        <>
          <h4>Validade:</h4>
          <p>{produto.dataValidade.split('T')[0]}</p>
        </>
      )}

      <h4>Status:</h4>
      <p>{produto.ativo ? 'Ativo' : 'Inativo'}</p>
    </div>
  );
}

export default Card;
