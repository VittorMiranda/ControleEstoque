// src/Components/Body/index.jsx
import './Body.css';
import { useEffect, useState } from 'react';
import Card from '../Card';

const Body = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos'); // endpoint do seu backend
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <main className='corpo'>
      <div className='principal'>
        {produtos.length > 0 ? (
          produtos.map(produto => <Card key={produto._id} produto={produto} />)
        ) : (
          <p>Nenhum produto cadastrado.</p>
        )}
      </div>
    </main>
  );
}

export default Body;
