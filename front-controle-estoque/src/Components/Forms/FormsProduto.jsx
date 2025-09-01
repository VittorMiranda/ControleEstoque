import { useState, useEffect } from "react";
import Inputs from "../Inputs";
import Button from "../Button";
import './Forms.css';
import { useAuth } from '../../Contexts/AuthContext';

// Import React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forms = ({ produtoEdit, produtoId }) => {
  const { token } = useAuth();
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
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, fornRes] = await Promise.all([
          fetch("http://localhost:3000/categoria"),
          fetch("http://localhost:3000/fornecedor")
        ]);

        const [catData, fornData] = await Promise.all([catRes.json(), fornRes.json()]);
        setCategorias(catData);
        setFornecedores(fornData);

        if (produtoEdit) {
          setProduto({
            ...produtoEdit,
            categoria: produtoEdit.categoria?._id || "",
            fornecedor: produtoEdit.fornecedor?._id || "",
            dataValidade: produtoEdit.dataValidade
              ? produtoEdit.dataValidade.split("T")[0]
              : ""
          });
        }
      } catch (err) {
        toast.error("Erro ao buscar categorias ou fornecedores.");
        console.error(err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [produtoEdit]);  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduto(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = produtoId ? "PUT" : "POST";
    const url = produtoId 
      ? `http://localhost:3000/produtos/${produtoId}` 
      : "http://localhost:3000/produtos";

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(produto)
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Erro ao salvar produto");
        return;
      }

      toast.success(produtoId ? "Produto atualizado!" : "Produto cadastrado!");
    
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

    } catch (err) {
      console.error("Erro:", err);
      toast.error("Ocorreu um erro ao salvar o produto.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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

        <Button text={produtoId ? "Atualizar" : "Cadastrar"} type="submit" />
      </form>
    </>
  );
};

export default Forms;
