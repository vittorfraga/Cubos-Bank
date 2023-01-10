const { contas } = require("../dados/bancodedados");
const { filtrarConta } = require("../funcoes/funcoes");

function verificarContaExiste(req, res, next) {
  const { numero_conta } = req.body;

  const contaEncontrada = filtrarConta(numero_conta);

  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: "A conta informada não existe!" });
  }

  next();
}

function verificaSenhaESaldo(req, res, next) {
  const { numero_conta, senha, valor } = req.body;

  if (!senha) {
    return res.status(404).json({ mensagem: "Informe a senha!" });
  }

  contaAtual = filtrarConta(numero_conta);

  if (senha !== contaAtual.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha inválida!" });
  }

  if (valor > contaAtual.saldo) {
    return res.status(400).json({ mensagem: "Saldo insuficiente!" });
  }
  next();
}

function verificaContasExistem(req, res, next) {
  const { numero_conta_origem, numero_conta_destino } = req.body;

  const contaOrigem = filtrarConta(numero_conta_origem);

  const contaDestino = filtrarConta(numero_conta_destino);

  if (!contaOrigem) {
    return res
      .status(404)
      .json({ mensagem: "A conta origem informada não existe!" });
  }
  if (!contaDestino) {
    return res
      .status(404)
      .json({ mensagem: "A conta destino informada não existe!" });
  }

  next();
}

module.exports = {
  verificarContaExiste,
  verificaSenhaESaldo,
  verificaContasExistem,
};
