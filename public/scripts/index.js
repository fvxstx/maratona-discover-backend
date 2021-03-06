import Modal from "./modal.js";

const modal = Modal({ animateClasses: ["animate-pop", "back"] });

const cards = document.querySelectorAll(".cards .card");
const deleteForm = document.querySelector("#delete-job");
const completedForm = document.querySelector("#completed-job");

for (let card of cards) {
  const cardId = card.dataset.id;

  const completedButton = card.querySelector("button.completed");
  completedButton.onclick = () => {
    modal.openCompleted();
    completedForm.setAttribute("action", "/completed/" + cardId);
  };

  const deleteButton = card.querySelector("button.delete");
  deleteButton.onclick = () => {
    modal.open();
    deleteForm.setAttribute("action", "/job/delete/" + cardId);
  };
}
