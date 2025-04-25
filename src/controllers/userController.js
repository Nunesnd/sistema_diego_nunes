const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await createUser({ name, email, password });
    res.status(201).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro no login", error });
  }
};

