// Importando arquivos
const Profile = require("../model/Profile");

// module.exports: exportando arquivo

module.exports = {
  // Renderizando o arquivo EJS profile
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
    // get: pegando os dados do profile
  },

  // Atualizando o profile
  async update(req, res) {
    // Fazendo o calculo do meu valor de trabalho conf. meu tempo
    const data = req.body;

    const weeksPerYear = 52;

    // removendo as semanas de ferias
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    // Total de hrs trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    // Total hrs trabalhadas no mes
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    // Qual o valor da Hr
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    // Atualizando as informacoes do perfil
    await Profile.update({
      ...(await Profile.get()),
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
