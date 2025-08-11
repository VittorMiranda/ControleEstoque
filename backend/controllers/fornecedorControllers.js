const Fornecedor = require("../models/fornecedorModels");

exports.criar = async (req, res) => {
    try {
        const fornecedor = new Fornecedor(req.body);
        await fornecedor.save();
        res.status(201).json(fornecedor);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const fornecedores = await Fornecedor.find();
        res.json(fornecedores);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findById(req.params.id);
        if (!fornecedor) return res.status(404).json({ msg: "Fornecedor não encontrado" });
        res.json(fornecedor);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fornecedor) return res.status(404).json({ msg: "Fornecedor não encontrado" });
        res.json(fornecedor);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);
        if (!fornecedor) return res.status(404).json({ msg: "Fornecedor não encontrado" });
        res.json({ msg: "Fornecedor removido" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
