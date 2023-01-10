const express = require("express");
const {
  listarContas,
  criarConta,
  atualizarUsuario,
  deletarConta,
} = require("./controladores/contas");
const {
  depositar,
  sacar,
  transferir,
  extrato,
  saldo,
} = require("./controladores/transacoes");
const {
  verificarContaExiste,
  verificaSenhaESaldo,
  verificaContasExistem,
} = require("./intermediarios/operacoes");
const {
  verificaCampos,
  verificaCpf,
  verificaEmail,
  verificaNumeroContaInfomado,
  verificaValorInformadoEPositivo,
  verificaNumeroValido,
  verificaNumeroContaESenha,
} = require("./intermediarios/validarCampos");
const validarSenhaBanco = require("./intermediarios/validarSenhaBanco");

const rotas = express();

rotas.get("/contas", validarSenhaBanco, listarContas);
rotas.post("/contas", verificaCampos, verificaCpf, verificaEmail, criarConta);
rotas.put(
  "/contas/:numeroConta/usuario",
  verificaCampos,
  verificaNumeroValido,
  verificaCpf,
  verificaEmail,
  atualizarUsuario
);
rotas.delete("/contas/:numeroConta", verificaNumeroValido, deletarConta);
rotas.post(
  "/transacoes/depositar",
  verificarContaExiste,
  verificaNumeroContaInfomado,
  verificaValorInformadoEPositivo,
  depositar
);
rotas.post(
  "/transacoes/sacar",
  verificaNumeroContaInfomado,
  verificaValorInformadoEPositivo,
  verificarContaExiste,
  verificaSenhaESaldo,
  sacar
);
rotas.post("/transacoes/transferir", verificaContasExistem, transferir);
rotas.get("/contas/extrato", verificaNumeroContaESenha, extrato);
rotas.get("/contas/saldo/", verificaNumeroContaESenha, saldo);
module.exports = rotas;
