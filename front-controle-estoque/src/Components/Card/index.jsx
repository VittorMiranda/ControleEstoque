import './Card.css';
import placeholderImg from '../../assets/placeholder.png';
import TrashIcon from "../../assets/trash.svg";
import EditIcon from "../../assets/edit.svg";
import { useNavigate } from 'react-router-dom';

const Card = ({ produto, onDelete }) => {
  const navigate = useNavigate();
  const imagem = produto?.imagemUrl || placeholderImg;
  const precoVenda = produto?.precoVenda
    ? parseFloat(produto.precoVenda.toString())
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
      <p>R$ {precoVenda}</p>
      <p>{produto?.quantidade || 0} {produto?.unidade || 'un'}</p>
    </div>
  );
}


export default Card;
