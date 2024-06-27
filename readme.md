# Aplicação serverless com Firebase Functions

Esta aplicação segue uma arquitetura serverless tendo o código sendo executado pelo **Firebase** expondo uma REST Api criada com o framework Express.js.

As rotas da api podem ser encontradas no diretório `functions/src/routes`

Os eventos não `http` estão alocados no diretório `functions/src/events`.

O código da aplicação está todo escrito em Typescript para uma melhor experiência do desenvolvedor.

### Instalação
A instalação é bem simples, apenas o comando:
```bash
npm i
```

### Executando localmente

Para emular o firebase localmente você deve ter instalado globalmente o pacote `firebase-tools`. Basta executar o seguinte comando:

```bash
npm i -g firebase-tools
```

O projeto já está todo configurado para emular as `functions` e o `firestore`. Para executar o emulador basta rodar o seguinte comando do firebase:

```bash
firebase emulators:start --project [ID_DO_PROJETO]
```

Após emulado você pode enviar requisições para a REST API e acompanhar os eventos sendo acionados.

### Testando
O projeto conta com testes de integração, para rodar estes testes é necessário primeiramente configurar seu projeto no firebase, e deve ter ativado o `firestore` e as `functions`.

Após configurado baixe `json` correspondente à **Conta de Serviço**(*service account*) e salve-o como `functions/test/service-account.json`

Para executar os testes execute o seguinte comando:
```bash
npm run test
```

### Deploy
Este repositório conta com um script de deploy. Para executá-lo basta rodar o comando abaixo:
```bash
npm run deploy
```

**Nota**: Você precisa estar autenticado para executar o deploy. Para se autenticar utilize o pacote do firebase que foi instalado globalmente e execute o comando abaixo:
```bash
firebase login
```