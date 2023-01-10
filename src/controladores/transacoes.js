const bancodedados = require("../dados/bancodedados");

const {
  dataDaOperacao,
  filtrarConta,
  deposito,
  saque,
} = require("../funcoes/funcoes");

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (Number(valor) < 0) {
    return res.status(400).json({
      mensagem: "Não é permitido depósitos com valores negativos ou zerados",
    });
  }

  deposito(numero_conta, valor);

  return res.status(201).json({ mensagem: "Depósito realizado com sucesso!" });
};

const sacar = (req, res) => {
  const { numero_conta, valor } = req.body;

  saque(numero_conta, valor);

  return res
    .status(201)
    .json({ mensagem: `Saque de ${valor} realizado com sucesso` });
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos!" });
  }

  contaOrigem = filtrarConta(numero_conta_origem);

  contaDestino = filtrarConta(numero_conta_destino);

  if (senha !== contaOrigem.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha inválida!" });
  }

  if (Number(valor) > contaOrigem.saldo) {
    return res.status(400).json({ mensagem: "Saldo insuficiente!" });
  }

  contaOrigem.saldo -= valor;

  contaDestino.saldo += valor;

  bancodedados.transferencias_enviadas.push({
    data: dataDaOperacao(),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  });

  bancodedados.transferencias_recebidas.push({
    data: dataDaOperacao(),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  });

  return res
    .status(201)
    .json({ mensagem: "Transferência realizada com sucesso!" });
};

const extrato = (req, res) => {
  const { numero_conta, senha } = req.query;

  const contaEcontrada = filtrarConta(numero_conta);

  if (!contaEcontrada) {
    return res.status(404).json({ mensagem: "A conta informada não existe!" });
  }

  if (senha !== contaEcontrada.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha inválida!" });
  }

  const depositos = bancodedados.depositos.filter(
    (numeroConta) => numeroConta.numero_conta === numero_conta
  );

  const saques = bancodedados.saques.filter(
    (numeroConta) => numeroConta.numero_conta === numero_conta
  );

  const transferenciasEnviadas = bancodedados.transferencias_enviadas.filter(
    (numeroConta) => numeroConta.numero_conta_origem === numero_conta
  );

  const transferenciasRecebidas = bancodedados.transferencias_recebidas.filter(
    (numeroConta) => numeroConta.numero_conta_destino === numero_conta
  );

  res.status(200).json({
    depositos: depositos,
    saques: saques,
    transferenciasEnviadas: transferenciasEnviadas,
    transferenciasRecebidas: transferenciasRecebidas,
  });
};

const saldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  const conta = filtrarConta(numero_conta);

  if (!conta) {
    return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
  }

  if (senha !== conta.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha inválida!" });
  }

  return res.json({ saldo: conta.saldo });
};

module.exports = {
  depositar,
  sacar,
  transferir,
  extrato,
  saldo,
};
