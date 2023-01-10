const { contas } = require("../dados/bancodedados");

function verificaCampos(req, res, next) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos!" });
  }

  next();
}

function verificaCpf(req, res, next) {
  const cpf = req.body.cpf;

  const cpfJaExiste = contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });
  if (cpfJaExiste) {
    return res
      .status(400)
      .json({ menssagem: "Já existe uma conta com o cpf informado!" });
  }
  next();
}

function verificaEmail(req, res, next) {
  const email = req.body.email;

  const emailJaexiste = contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (emailJaexiste) {
    return res
      .status(400)
      .json({ menssagem: "Já existe uma conta com o e-mail informado!" });
  }
  next();
}

function verificaNumeroValido(req, res, next) {
  const numeroConta = req.params.numeroConta;
  if (isNaN(numeroConta)) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta informada é inválido" });
  }
  next();
}

function verificaNumeroContaInfomado(req, res, next) {
  const { numero_conta } = req.body;
  if (!numero_conta) {
    return res
      .status(404)
      .json({ mensagem: "O número da conta é obrigatório!" });
  }
  next();
}
function verificaValorInformadoEPositivo(req, res, next) {
  const { valor } = req.body;
  if (!valor) {
    return res.status(404).json({ mensagem: "Informe o Valor!" });
  }

  if (Number(valor) <= 0) {
    return res
      .status(400)
      .json({ mensagem: "O valor não pode ser menor que zero!" });
  }
  next();
}

function verificaSenhaInformada(req, res, next) {
  const { senha } = req.body;

  if (!senha) {
    return res.status(404).json({ mensagem: "Informe a senha!" });
  }
  next();
}

function verificaNumeroContaESenha(req, res, next) {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res
      .status(404)
      .json({ mensagem: "Infome o número da conta e a senha!" });
  }

  next();
}

module.exports = {
  verificaCampos,
  verificaCpf,
  verificaEmail,
  verificaNumeroValido,
  verificaNumeroContaInfomado,
  verificaValorInformadoEPositivo,
  verificaSenhaInformada,
  verificaNumeroContaESenha,
};
