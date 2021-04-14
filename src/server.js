// --- Pegando algumas bibliotecas ---

// require: tu coloca um pedido, para receber algo
// ele ta pedindo o pacote express no node
const express = require("express");

// pegando o arquivo routes
const routes = require("./routes");

// criando o server
const server = express();

const path = require("path");

// --- Usando o EJS ---

// template engine
server.set("view engine", "ejs");

// --- Usando o PATH ---

// Mudando a localização da pasta
server.set("views", path.join(__dirname, "views"));

// --- Configurações do express ---

// Config para poder usar o req.body
// req.body: é o corpo da requisição
server.use(express.urlencoded({ extended: true }));

// --- Pegando rotas ---

// colocando uma nova funcionalidade no express, pelo middleware
// pegando na pasta public os arquivos
server.use(express.static("public"));

// pegando os arquivos EJS pelas rotas
server.use(routes);

// --- Inicializando o servidor ---

// listen: ligando o servidor, colocando a porta e uma função
server.listen(3000, () => console.log("rodando"));
