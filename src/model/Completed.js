// Jobs concluidos

const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();

    const completed = await db.all(`SELECT * FROM completed`);

    await db.close();

    return completed.map((com) => ({
      id: com.id,
      name: com.name,
      "daily-hours": com.daily_hours,
      "total-hours": com.total_hours,
      createdAt: com.createdAt,
    }));
  },

  async delete(id) {
    const db = await Database();

    await db.run(`DELETE FROM completed WHERE id = ${id}`);

    await db.close();
  },

  async change(id, changeJob) {
    const db = await Database();

    await db.run(`INSERT INTO completed (
      name,
      daily_hours,
      total_hours,
      createdAt
    ) VALUES (
      "${changeJob.name}",
      ${changeJob["daily-hours"]},
      ${changeJob["total-hours"]},
      "${changeJob.createdAt}"
    )`);

    await db.run(`DELETE FROM jobs WHERE id = ${id}`);

    await db.close();
  },
};
