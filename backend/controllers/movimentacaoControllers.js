const Movimento = require("../models/movimentacaoEstoqueModels");

exports.criar = async (req, res) => {
    try {
        const movimento = new Movimento(req.body);
        await movimento.save();
        res.status(201).json(movimento);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const movimentos = await Movimento.find()
            .populate("produto")
            .populate("usuario");
        res.json(movimentos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const movimento = await Movimento.findById(req.params.id)
            .populate("produto")
            .populate("usuario");
        if (!movimento) return res.status(404).json({ msg: "Movimento não encontrado" });
        res.json(movimento);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const movimento = await Movimento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movimento) return res.status(404).json({ msg: "Movimento não encontrado" });
        res.json(movimento);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const movimento = await Movimento.findByIdAndDelete(req.params.id);
        if (!movimento) return res.status(404).json({ msg: "Movimento não encontrado" });
        res.json({ msg: "Movimento removido" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
