# Project - Clean Movies TMDB
Apresente uma lista de filmes, com uma tela de detalhes, chamando ao menos dois serviços do TMDb. Utilizando NodeJs e MySQL.

# Clean Architecture

![Clean Architecture](https://stiffcode.com.br/cls-node.png)


## [Project Requirements](/api/documentation/movies-use-case.md)

## Instalação
``` bash
$ cd api
$ yarn install
$ npm install
```
## Utilização da API
.env
``` bash
API_TMDB_URL=https://api.themoviedb.org/3
API_TMDB_KEY=
MYSQL_USER=
MYSQL_HOST=
MYSQL_PASSWORD=
MYSQL_DB=
port
```
Rodando a API 
``` bash
yarn build
yarn start
```
## Utilização do website
.env
``` bash
ENVIRONMENT=
API_URL=
API_TMDB_IMG=https://image.tmdb.org/t/p/w500
```
Rodando o Website 
``` bash
yarn build
yarn start
```
