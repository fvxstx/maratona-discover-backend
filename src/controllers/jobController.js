// Importando dados
const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  // req and res: pedido e resposta(response e request)
  // Pegando o arquivo job.ejs e renderizando
  create(req, res) {
    return res.render("job");
  },

  // Pegando as informações do formulario
  async save(req, res) {
    await Job.create({
      // req.body: corpo da requisição(req)
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],

      // date.now(): ele mostra a data de hoje em milisegundos
      createdAt: Date.now(),
    });

    // redirect: redirecionando para algum local
    return res.redirect("/");
  },

  async show(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    // params: parametros de um URL
    const jobId = req.params.id;

    // find: procura algo e pega pra mim
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    // !: se nao
    if (!job) {
      return res.send("Job not found!");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    await Job.update(updatedJob, jobId);

    res.redirect("/job/" + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect("/");
  },
};
