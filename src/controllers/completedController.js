const Completed = require("../model/Completed");
const Profile = require("../model/Profile");
const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  async index(req, res) {
    const completeds = await Completed.get();
    const profile = await Profile.get();

    const updateCompleted = completeds.map((com) => {
      return {
        ...com,
        budget: JobUtils.calculateBudget(com, profile["value-hour"]),
      };
    });

    return res.render("completed", { jobs: updateCompleted });
  },

  async delete(req, res) {
    const jobId = req.params.id;

    await Completed.delete(jobId);

    return res.redirect("/completed");
  },

  async change(req, res) {
    const jobId = req.params.id;
    const Jobs = await Job.get();

    const job = Jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found!");
    }

    await Completed.change(jobId, {
      name: job.name,
      "daily-hours": job["daily-hours"],
      "total-hours": job["total-hours"],
      createdAt: job.createdAt,
    });

    return res.redirect("/completed");
  },
};
