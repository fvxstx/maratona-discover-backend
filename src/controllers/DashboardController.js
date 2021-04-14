const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  // Como vou usar o await preciso colocar async
  async index(req, res) {
    const jobs = await Job.get();
    // await: para poder pegar o async do get vc precisa de um await
    const profile = await Profile.get();

    // Vendo os status
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // Total de hrs por dia de jobs em progresso
    let jobTotalHours = 0;

    // Melhorando o Job.data
    //map: ele devolve um novo array como resultado
    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDay(job);
      const status = remaining <= 0 ? "done" : "progress";

      // ?: if
      jobTotalHours =
        status == "progress"
          ? jobTotalHours + Number(job["daily-hours"])
          : jobTotalHours;

      // Somando os status
      statusCount[status] += 1;

      return {
        // ...: copia tudo do objeto e joga dentro de outro
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    const freeHours = profile["hours-per-day"] - jobTotalHours;

    // render: renderizando um arquivo com o EJS
    // enviando o objeto "jobs" para o index
    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
