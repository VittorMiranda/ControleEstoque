import './Card.css';
import placeholderImg from '../../assets/placeholder.png';

const Card = ({ produto }) => {
  const imagem = produto?.imagemUrl || placeholderImg;

  // Conversão correta do Decimal128
  const precoVenda = produto?.precoVenda
    ? parseFloat(produto.precoVenda.toString())
    : '0.00';

  return (
    <div className='card'>
      <img src={imagem} alt={produto?.nome || 'Produto'} />
      <h3>{produto?.nome || 'Produto'}</h3>
      <p>R$ {precoVenda}</p>
      <p>{produto?.quantidade || 0} {produto?.unidade || 'un'}</p>
    </div>
  );
}

export default Card;
