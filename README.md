# Desafio Módulo 2 - Back-end

API para um Banco Digital, esse será um projeto **piloto**, ou seja, no futuro outras funcionalidades serão implementadas, portanto, dados do banco (nome, agência, etc.) serão imutáveis.

Seu papel é construir uma RESTful API que permita:

- Criar conta bancária
- Listar contas bancárias
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depósitar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário

**Importante: Sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação, ok?**

**Exemplo:**

```javascript
// Quando é informado um número de conta que não existe:
// HTTP Status 404
{
    "mensagem": "Conta bancária não encontada!"
}
```

## Persistências dos dados

Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. **Todas as transações e contas bancárias deverão ser inseridas dentro deste objeto, seguindo a estrutura que já existe.**

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
    banco: {
        nome: "Cubos Bank",
        numero: "123",
        agencia: "0001",
        senha: "Cubos123Bank",
    },
    contas: [
        // array de contas bancárias
    ],
    saques: [
        // array de saques
    ],
    depositos: [
        // array de depósitos
    ],
    transferencias: [
        // array de transferências
    ],
}
```

## Requisitos obrigatórios

- Sua API deve seguir o padrão REST
- Seu código deve estar organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, é esperado que ele tenha, no mínimo:
  - Um arquivo index.js
  - Um arquivo de rotas
  - Um pasta com controladores
- Qualquer valor (dinheiro) deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)
- Evite códigos duplicados. Antes de copiar e colar, pense se não faz sentido esse pedaço de código estar centralizado numa função.

## Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint deverá listar todas as contas bancárias existentes.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se a senha do banco foi informada (passado como query params na url)
  - Validar se a senha do banco está correta

- **Requisição** - query params (respeitando este nome)

  - senha_banco

- **Resposta**
  - listagem de todas as contas bancárias existentes

### Criar conta bancária

#### `POST` `/contas`

Esse endpoint deverá criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

- Você deverá, **OBRIGATORIAMENTE**:

  - Criar uma nova conta cujo número é único
  - CPF deve ser um campo único.
  - E-mail deve ser um campo único.
  - Verificar se todos os campos foram informados (todos são obrigatórios)
  - Definir o saldo inicial da conta como 0

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - data_nascimento
  - telefone
  - email
  - senha

- **Resposta**

  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint deverá atualizar apenas os dados do usuário de uma conta bancária.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se foi passado todos os campos no body da requisição
  - Verificar se o numero da conta passado como parametro na URL é válida
  - Se o CPF for informado, verificar se já existe outro registro com o mesmo CPF
  - Se o E-mail for informado, verificar se já existe outro registro com o mesmo E-mail
  - Atualizar os dados do usuário de uma conta bancária

- **Requisição** - O corpo (body) deverá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - data_nascimento
  - telefone
  - email
  - senha

- **Resposta**

  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint deve excluir uma conta bancária existente.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta passado como parametro na URL é válido
  - Permitir excluir uma conta bancária apenas se o saldo for 0 (zero)
  - Remover a conta do objeto de persistência de dados.

- **Requisição**

  - Numero da conta bancária (passado como parâmetro na rota)

- **Resposta**

  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint deverá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta e o valor do deposito foram informados no body
  - Verificar se a conta bancária informada existe
  - Não permitir depósitos com valores negativos ou zerados
  - Somar o valor de depósito ao saldo da conta encontrada

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor

- **Resposta**

  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint deverá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta, o valor do saque e a senha foram informados no body
  - Verificar se a conta bancária informada existe
  - Verificar se a senha informada é uma senha válida para a conta informada
  - Verificar se há saldo disponível para saque
  - Subtrair o valor sacado do saldo da conta encontrada

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor
  - senha

- **Resposta**

  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint deverá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados no body
  - Verificar se a conta bancária de origem informada existe
  - Verificar se a conta bancária de destino informada existe
  - Verificar se a senha informada é uma senha válida para a conta de origem informada
  - Verificar se há saldo disponível na conta de origem para a transferência
  - Subtrair o valor da transfência do saldo na conta de origem
  - Somar o valor da transferência no saldo da conta de destino

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta_origem
  - numero_conta_destino
  - valor
  - senha

- **Resposta**

  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint deverá retornar o saldo de uma conta bancária.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
  - Verificar se a conta bancária informada existe
  - Verificar se a senha informada é uma senha válida
  - Exibir o saldo da conta bancária em questão

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint deverá listar as transações realizadas de uma conta específica.

- Você deverá, **OBRIGATORIAMENTE**:

  - Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
  - Verificar se a conta bancária informada existe
  - Verificar se a senha informada é uma senha válida
  - Retornar a lista de transferências, depósitos e saques da conta em questão.

- **Requisição** - query params

  - numero_conta
  - senha

- **Resposta**
  - Relatório da conta
