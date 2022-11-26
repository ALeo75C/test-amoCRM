const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const fimeFormatted = (seconds) => {
  const time = [];
  time.push(Math.floor(seconds / 3600));
  time.push(Math.floor((seconds % 3600) / 60));
  time.push(seconds - time[0] * 3600 - time[1] * 60);
  return time;
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timer;
  return (seconds) => {
    clearInterval(timer);
    timer = setInterval(() => {
      const time = fimeFormatted(seconds);
      const formatTime = time.map((i) => (i >= 10 ? `${i}` : `0${i}`));
      timerEl.innerHTML = time.join(":");
      seconds > 0 ? seconds-- : clearInterval(timer);
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  if (seconds <= 100 * 60 * 60 - 1) {
    animateTimer(seconds);
  } else {
    alert("Ошибка. Введите количество секунд > 0 и < 100 часов");
  }

  inputEl.value = "";
});
