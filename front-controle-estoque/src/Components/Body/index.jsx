// src/Components/Body/index.jsx
import './Body.css';
import { useEffect, useState } from 'react';
import Card from '../Card';

const Body = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const token = localStorage.getItem('token'); // pega o token do usuário logado

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ⚠ necessário para passar o JWT
      }
    });

    if (!res.ok) throw new Error('Não autorizado ou erro na exclusão');

    setProdutos(prev => prev.filter(prod => prod._id !== id));
  } catch (error) {
    console.error(error);
    alert('Não foi possível excluir o produto.');
  }
};


  return (
    <main className='corpo'>
      <div className='principal'>
        {produtos.length > 0 ? (
          produtos.map(produto => (
            <Card
              key={produto._id}
              produto={produto}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Nenhum produto cadastrado.</p>
        )}
      </div>
    </main>
  );
}

export default Body;
