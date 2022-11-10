# RICK AND MORTY API

> Este projeto consiste em uma lista de personagens de Rick e Morty, exibindo os detalhes sobre cada personagem.
> Ao fazer login, uma opção de personagem favorito fica disponível, e todos os personagens favoritos são salvos no banco de dados da aplicação.
> Página de favoritos está presente apenas enquanto o usuário estiver logado.

> O projeto ainda está sendo desenvolvido

## 🚀 Instalação

Você precisará do [Node.js](https://nodejs.org) e [PostgreSQL](https://www.postgresql.org/) instalado em seu computador para inicializar este aplicativo.

```bash
git clone https://github.com/baez-requiem/RickAndMortyAPI.BACKEND.git
$ cd RickAndMortyAPI.BACKEND
$ yarn install
$ yarn prisma migrate dev
$ yarn dev
```

Execute o aplicativo no modo de desenvolvimento.<br/>

## Variáveis de ambiente

* crie um arquivo .env
* insira DATABASE_URL="`<your_database_url>`"