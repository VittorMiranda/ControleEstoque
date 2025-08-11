const Produto = require("../models/produtoModels");

exports.criar = async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const produtos = await Produto.find()
            .populate("categoria")
            .populate("fornecedor");
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id)
            .populate("categoria")
            .populate("fornecedor");
        if (!produto) return res.status(404).json({ msg: "Produto não encontrado" });
        res.json(produto);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produto) return res.status(404).json({ msg: "Produto não encontrado" });
        res.json(produto);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) return res.status(404).json({ msg: "Produto não encontrado" });
        res.json({ msg: "Produto removido" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
