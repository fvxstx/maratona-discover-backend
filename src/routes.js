// --- Pegando bibliotecas e criando Objetos uteis ---

const express = require("express");

// Pegando a funcionalidade Router do express
const routes = express.Router();

// Importando arquivos
const ProfileController = require("./controllers/profileController");
const Jobcontroller = require("./controllers/jobcontroller");
const DashboardController = require("./controllers/DashboardController");

// --- Pegando arquivos EJS ---

// get: pegando algo
routes.get("/", DashboardController.index);
routes.get("/profile", ProfileController.index);
routes.get("/job", Jobcontroller.create);
routes.get("/job/:id", Jobcontroller.show);

// --- Mandando formularios ---

// post: mandando algo
routes.post("/job", Jobcontroller.save);
routes.post("/profile", ProfileController.update);
routes.post("/job/:id", Jobcontroller.update);
routes.post("/job/delete/:id", Jobcontroller.delete);

// --- Exportando as rotas ---

module.exports = routes;
