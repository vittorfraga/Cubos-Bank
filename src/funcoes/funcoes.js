const { format } = require("date-fns");
const bancodedados = require("../dados/bancodedados");
const { contas } = require("../dados/bancodedados");

function dataDaOperacao() {
  return format(new Date(), "dd/MM/uuuu - kk:mm:ss OOOO");
}

function filtrarConta(numeroConta) {
  return contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });
}

function deposito(numero_conta, valor) {
  const conta = filtrarConta(numero_conta);

  conta.saldo += Number(valor);

  bancodedados.depositos.push({
    data: dataDaOperacao(),
    numero_conta: numero_conta,
    valor: valor,
  });
}

function saque(numero_conta, valor) {
  const conta = filtrarConta(numero_conta);

  conta.saldo -= Number(valor);

  bancodedados.saques.push({
    data: dataDaOperacao(),
    numero_conta: numero_conta,
    valor: valor,
  });
}
module.exports = { dataDaOperacao, filtrarConta, deposito, saque };
