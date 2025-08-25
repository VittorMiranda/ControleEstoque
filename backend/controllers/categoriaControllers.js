const Categoria = require("../models/categoriaModels");

exports.criar = async (req, res) => {
    try {
        const categoria = new Categoria(req.body);
        await categoria.save();
        res.status(201).json(categoria);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ msg: "Categoria não encontrada" });
        res.json(categoria);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoria) return res.status(404).json({ msg: "Categoria não encontrada" });
        res.json(categoria);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoria) return res.status(404).json({ msg: "Categoria não encontrada" });
        res.json({ msg: "Categoria removida" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        // retorna apenas _id e nome
        const categorias = await Categoria.find({}, "_id nome");
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

