// Responsavel por criar o arquivo de banco de dados
// Só usa uma vez

// -- Inicando a conexão com o banco de dados
const Database = require("./config");

const initDb = {
  async init() {
    // -- Abrindo o banco de dados
    const db = await Database();

    // -- Criando as tabelas do banco de dados
    // Criando o campo e dizendo seu tipo
    // id é obrigatorio
    await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`);

    await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            createdAt DATETIME
        )`);

    await db.exec(`CREATE TABLE completed(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        createdAt DATETIME
    )`);

    // Inserindo nesses campos, os valores
    await db.run(`INSERT INTO profile (
            name, 
            avatar, 
            monthly_budget, 
            days_per_week, 
            hours_per_day, 
            vacation_per_year, 
            value_hour
        ) VALUES (
            "Fausto",
            "https://github.com/fvxstx.png",
            3000,
            5,
            5,
            4,
            75
        
        )`);

    await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            createdAt
        ) VALUES (
            "Pizzaria lafamilia",
            4,
            1,
            1618271553855
        )`);

    await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            createdAt
        ) VALUES (
            "Siscon",
            4,
            40,
            1618271553855
        )`);

    await db.run(`INSERT INTO completed(
        name,
        daily_hours,
        total_hours,
        createdAt
    ) VALUES (
        "Adu",
        2,
        10,
        1619900791298
    )`);

    // -- Fechando o banco de dados
    await db.close();
  },
};

initDb.init();
