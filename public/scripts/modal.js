export default function Modal({ animateClasses = [] }) {
  function open() {
    const wrapper = document.querySelector(`.modal-wrapper`);
    const element = document.querySelector(`.modal`);
    const cancelButton = document.querySelector(`.modal footer .gray`);

    cancelButton.addEventListener("click", close);

    document.addEventListener("keydown", closeOnEscape);
    wrapper.classList.add("on");
    element.classList.add(...animateClasses);
  }

  function close() {
    const wrapper = document.querySelector(`.modal-wrapper`);
    const element = document.querySelector(`.modal`);

    document.removeEventListener("keydown", closeOnEscape);
    wrapper.classList.remove("on");
    element.classList.remove(...animateClasses);
  }

  function openCompleted() {
    const wrapper = document.querySelector(`.modal-wrapper.complete`);
    const element = document.querySelector(`.modal.complete`);
    const cancelButton = document.querySelector(`.modal.complete footer .gray`);

    cancelButton.addEventListener("click", closeCompleted);

    document.addEventListener("keydown", closeOnEscape);
    wrapper.classList.add("on");
    element.classList.add(...animateClasses);
  }

  function closeCompleted() {
    const wrapper = document.querySelector(`.modal-wrapper.complete`);
    const element = document.querySelector(`.modal.complete`);

    document.removeEventListener("keydown", closeOnEscape);
    wrapper.classList.remove("on");
    element.classList.remove(...animateClasses);
  }

  function closeOnEscape({ key }) {
    if (key == "Escape") {
      close();
      closeCompleted();
    }
  }

  return {
    open,
    openCompleted,
  };
}
