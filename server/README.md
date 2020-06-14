# Backend - Posto Certo

## Pré-requisitos

Para que tudo funcione corretamente, é necessário ter instalados os seguintes *softwares*

* Node
* NPM
* Docker
* Docker Compose

## Banco de Dados

A aplicação usa um banco de dados MongoDB com a interface Mongo Express. Ambos utilizam diferentes contêineres do Docker, regidos por *docker-compose*.

Para a inicialização dos servidores do banco de dados, é necessário utilizar o comando

```bash
/db/$ sudo docker-compose up -d
```

tendo, na pasta /db/, o arquivo .env, cujo conteúdo são as configurações de usuário e senha do banco de dados.

```bash
DB_USERNAME=...
DB_PASSWORD=...
```

Assim, o cliente do MongoDB será inicializado na porta 27017 e a interface Mongo Express na porta 8081, ambos no *localhost*.

Na pasta /db/, há também o script killdocker.sh, que elimina todos os contêineres do Docker trabalhando no sistema. **Não utilizar no caso de haverem outros contêineres docker em uso.**

## Servidor

### Instalação de módulos

Antes da inicialização do servidor, é necessário instalar todos os seus módulos. Isto pode ser feito através do comando

```
npm install
```

### Inicialização do servidor

O servidor utiliza as API's do MongoDB e do serviço de localização HERE, este requerendo uma chave privada. Para este projeto, foi usada uma chave REST fornecida no plano gratuito Freemium da Here API.

Para que o servidor funcione corretamente, é necessário ter um *shell* com as seguintes variáveis ambiente.

* HERE_API_KEY : Chave da HERE API
* DB_USERNAME : Nome de usuário de acesso ao banco de dados
* DB_PASSWORD : Senha de acesso do banco de dados
* DB_HOST : *Host* do cliente MongoDB
* DB_PORT : Porta do cliente MongoDB
* HASH_SECRET : String chave para o *hashing* das senhas, serviço necessário para a autenticação de usuários.

Neste *shell*, basta utilizar o comando

```bash
node server
```

Após isso, o servidor de dados estará funcionando em *localhost:9090*.

> Nota: Caso qualquer uma destas variáveis não esteja definida, o servidor não irá ser iniciado.
