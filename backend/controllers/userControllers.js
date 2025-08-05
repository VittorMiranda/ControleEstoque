// Get - User
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.test = (requisicao, resposta) => {
    resposta.status(200).send("Bem-vindo à API");
};

exports.create = async (req, res) => {
    const { name, email, password, confirmapassword } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ msg: "Preencha todos os campos" });
    }

    if (password !== confirmapassword) {
        return res.status(422).json({ msg: "As senhas devem ser iguais" });
    }

    const userRepetido = await User.findOne({ email: email });
    if (userRepetido) {
        return res.status(422).json({ msg: "Usuário já existe!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const novoUsuario = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await novoUsuario.save();
        res.status(201).json({ msg: "Usuário criado!" });
    } catch (error) {
        res.status(500).json({ erro: error });
    }
};

exports.autentica = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(422).json({ msg: "Preencha todos os campos" });
    }
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(422).json({ msg: "Faça um cadastro!" });
      }
  
      console.log('Senha recebida no login:', password);
      console.log('Hash salvo no banco:', user.password); // <-- AQUI AGORA ESTÁ CERTO
  
      if (!user.password) {
        return res.status(500).json({ msg: "Erro interno: usuário sem senha cadastrada." });
      }
  
      const checkPassword = await bcrypt.compare(password, user.password); // <-- AQUI TAMBÉM
  
      if (!checkPassword) {
        return res.status(422).json({ msg: "Senha incorreta." });
      }
  
      const secret = process.env.SECRET;
      if (!secret) {
        return res.status(500).json({ msg: "Erro interno: segredo JWT não configurado." });
      }
  
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
  
      res.status(200).json({ msg: "Autenticação realizada", token });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: error.message });
    }
  };