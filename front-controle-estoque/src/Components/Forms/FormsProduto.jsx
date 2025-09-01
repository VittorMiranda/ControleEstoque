import { useState, useEffect } from "react";
import Inputs from "../Inputs";
import Button from "../Button";
import './Forms.css';

const Forms = ({ produtoEdit, produtoId }) => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    codigoBarras: "",
    categoria: "",
    fornecedor: "",
    quantidade: 0,
    unidade: "",
    precoCompra: "",
    precoVenda: "",
    dataValidade: "",
    imagemUrl: "",
    ativo: true
  });

  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    if (produtoEdit) setProduto(produtoEdit); // preenche se estiver editando

    fetch("http://localhost:3000/categoria")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Erro ao buscar categorias:", err));

    fetch("http://localhost:3000/fornecedor")
      .then(res => res.json())
      .then(data => setFornecedores(data))
      .catch(err => console.error("Erro ao buscar fornecedores:", err));
  }, [produtoEdit]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduto({ ...produto, [name]: type === "checkbox" ? checked : value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const method = produtoId ? "PUT" : "POST";
  const url = produtoId ? `http://localhost:3000/produtos/${produtoId}` : "http://localhost:3000/produto";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  })
    .then(res => res.json())
    .then(data => {
      alert(produtoId ? "Produto atualizado!" : "Produto cadastrado!");
      
      if (!produtoId) {
        // reset apenas no cadastro
        setProduto({
          nome: "",
          descricao: "",
          codigoBarras: "",
          categoria: "",
          fornecedor: "",
          quantidade: 0,
          unidade: "",
          precoCompra: "",
          precoVenda: "",
          dataValidade: "",
          imagemUrl: "",
          ativo: true
        });
      }
    })
    .catch(err => console.error("Erro:", err));
};



  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{produtoId ? "Editar Produto" : "Cadastro de Produtos"}</h3>

      <Inputs label="Nome" name="nome" value={produto.nome} onChange={handleChange} />
      <Inputs label="Descrição" name="descricao" value={produto.descricao} onChange={handleChange} />
      <Inputs label="Código de Barras" name="codigoBarras" value={produto.codigoBarras} onChange={handleChange} />

      <Inputs
        label="Categoria"
        type="select"
        name="categoria"
        value={produto.categoria}
        onChange={handleChange}
        options={categorias.map(cat => ({ value: cat._id, label: cat.nome }))}
      />

      <Inputs
        label="Fornecedor"
        type="select"
        name="fornecedor"
        value={produto.fornecedor}
        onChange={handleChange}
        options={fornecedores.map(forn => ({ value: forn._id, label: forn.nome }))}
      />

      <Inputs label="Quantidade" type="number" name="quantidade" value={produto.quantidade} onChange={handleChange} />

      <Inputs
        label="Unidade"
        type="select"
        name="unidade"
        value={produto.unidade}
        onChange={handleChange}
        options={[
          { value: "un", label: "Unidade" },
          { value: "kg", label: "Quilo" },
          { value: "L", label: "Litro" },
          { value: "mL", label: "Mililitro" },
          { value: "g", label: "Grama" }
        ]}
      />

      <Inputs label="Preço de Compra" type="number" name="precoCompra" value={produto.precoCompra} onChange={handleChange} />
      <Inputs label="Preço de Venda" type="number" name="precoVenda" value={produto.precoVenda} onChange={handleChange} />
      <Inputs label="Data de Validade" type="date" name="dataValidade" value={produto.dataValidade} onChange={handleChange} />
      <Inputs label="Imagem URL" name="imagemUrl" value={produto.imagemUrl} onChange={handleChange} />

      <div className="input-group">
        <label>
          <input
            type="checkbox"
            name="ativo"
            checked={produto.ativo}
            onChange={handleChange}
          />
          Ativo
        </label>
      </div>

      <Button text={produtoId ? "Atualizar Produto" : "Cadastrar Produto"} type="submit" />
    </form>
  );
};

export default Forms;
