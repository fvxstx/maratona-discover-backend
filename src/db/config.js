// Configuração do Banco de dados

// -- Importando
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Abrindo o banco de dados
module.exports = () =>
  open({
    // arquivo que vai guardar as informações
    filename: "./database.sqlite",

    // configuração para salvar
    driver: sqlite3.Database,
  });
