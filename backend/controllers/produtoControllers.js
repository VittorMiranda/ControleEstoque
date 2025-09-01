const Produto = require("../models/produtoModels");
const Movimento = require("../models/movimentacaoEstoqueModels");

// Função auxiliar para converter Decimal128 em float
const formatarProduto = (produto) => ({
    ...produto._doc,
    precoCompra: parseFloat(produto.precoCompra.toString()),
    precoVenda: parseFloat(produto.precoVenda.toString())
});

// Criar produto
exports.criar = async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(formatarProduto(produto));
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

// Listar produtos
exports.listar = async (req, res) => {
    try {
        const produtos = await Produto.find()
            .populate("categoria")
            .populate("fornecedor");

        const produtosFormatados = produtos.map(formatarProduto);
        res.json(produtosFormatados);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// Buscar por ID
exports.buscarPorId = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id)
            .populate("categoria")
            .populate("fornecedor");

        if (!produto) return res.status(404).json({ msg: "Produto não encontrado" });
        res.json(formatarProduto(produto));
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// Atualizar produto (apenas admin e registra movimentação)
exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("categoria")
            .populate("fornecedor");

        if (!produto) return res.status(404).json({ msg: "Produto não encontrado" });

        // Registrar movimentação
        await Movimento.create({
            produto: produto._id,
            usuario: req.user.id, // vem do token
            tipo: "atualização",
            quantidade: req.body.quantidade || produto.quantidade,
            descricao: `Produto atualizado: ${produto.nome}`,
            data: new Date()
        });

        res.json(formatarProduto(produto));
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

// Deletar produto (apenas admin e registra movimentação)
exports.deletar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) return res.status(404).json({ msg: "Produto não encontrado" });

        // Registrar movimentação
        await Movimento.create({
            produto: produto._id,
            usuario: req.user.id, // vem do token
            tipo: "remoção",
            quantidade: produto.quantidade,
            descricao: `Produto deletado: ${produto.nome}`,
            data: new Date()
        });

        res.json({ msg: "Produto removido e movimentação registrada" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
