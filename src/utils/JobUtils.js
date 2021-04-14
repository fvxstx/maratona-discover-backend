module.exports = {
  // Calculo dos dias que faltam
  remainingDay(job) {
    //toFixed: arredondando um numero
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    const createdDate = new Date(job.createdAt);

    // getDate: pegando o numero fixo do mes
    const dueDay = createdDate.getDate() + Number(remainingDays);

    // setDate: criando uma nova data em milisegundos
    const dueDate = createdDate.setDate(dueDay);

    // diferença do tempo em milisegundos
    const timeDiffMs = dueDate - Date.now();

    // Transformar milisegundos em dias
    const dayMs = 1000 * 60 * 60 * 24;

    // A diferença em dias
    // Math.floor: arredondando o calculo para baixo
    const dayDiff = Math.floor(timeDiffMs / dayMs);

    return dayDiff;
  },

  // Calculando o valor do job
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
};
