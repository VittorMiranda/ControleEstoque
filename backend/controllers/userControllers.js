// Controller - Usuario
const Usuario = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
    res.status(200).send("Bem-vindo à API");
};

exports.create = async (req, res) => {
    const { nome, email, senha, confirmaSenha, role } = req.body;

    if (!nome || !email || !senha) {
        return res.status(422).json({ msg: "Preencha todos os campos obrigatórios" });
    }

    if (senha !== confirmaSenha) {
        return res.status(422).json({ msg: "As senhas devem ser iguais" });
    }

    const usuarioExistente = await Usuario.findOne({ email: email });
    if (usuarioExistente) {
        return res.status(422).json({ msg: "Usuário já existe!" });
    }

    try {
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUsuario = new Usuario({
            nome,
            email,
            senha: senhaHash,
            role: role || "usuario"
        });

        await novoUsuario.save();
        res.status(201).json({ msg: "Usuário criado!" });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.autentica = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(422).json({ msg: "Preencha todos os campos" });
    }

    try {
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(422).json({ msg: "Usuário não encontrado. Faça o cadastro!" });
        }

        if (!usuario.senha) {
            return res.status(500).json({ msg: "Erro interno: senha não cadastrada." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(422).json({ msg: "Senha incorreta." });
        }

        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500).json({ msg: "Erro interno: segredo JWT não configurado." });
        }

        const token = jwt.sign({ id: usuario._id, role: usuario.role }, secret, { expiresIn: '1h' });

        res.status(200).json({
            msg: "Autenticação realizada com sucesso",
            token,
            nome: usuario.nome,
            email: usuario.email
        });


    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
