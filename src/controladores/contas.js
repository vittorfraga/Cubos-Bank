const { contas } = require("../dados/bancodedados");
const bancoDeDados = require("../dados/bancodedados");
const { filtrarConta } = require("../funcoes/funcoes");

let idProximaContaCriada = 2;

const listarContas = (req, res) => {
  return res.json(bancoDeDados.contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  bancoDeDados.contas.push({
    numero: idProximaContaCriada,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  });
  idProximaContaCriada++;
  return res.status(201).json();
};

const atualizarUsuario = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const conta = filtrarConta(numeroConta);

  if (!conta) {
    return res.status(404).json({ mensagem: "A conta informada não existe!" });
  }

  if (senha !== conta.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha inválida" });
  }

  conta.usuario.nome = nome;
  conta.usuario.cpf = cpf;
  conta.usuario.data_nascimento = data_nascimento;
  conta.usuario.telefone = telefone;
  conta.usuario.email = email;
  conta.usuario.senha = senha;

  return res.status(204).json();
};

const deletarConta = (req, res) => {
  const { numeroConta } = req.params;

  const contaExclusao = filtrarConta(numeroConta);

  if (!contaExclusao) {
    return res.status(404).json({ mensagem: "A conta informada não existe!" });
  }

  if (contaExclusao.saldo > 0) {
    return res
      .status(400)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  const indiceConta = contas.findIndex(
    (conta) => conta.numero === Number(numeroConta)
  );

  contas.splice(indiceConta, 1);

  return res.json();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuario,
  deletarConta,
};
