import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dataPicker: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.disabled = true;
let targetDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.button.disabled = true;
      return;
    } else {
      refs.button.disabled = false;
      targetDate = selectedDates[0].getTime();
    }
  },
};

const fp = flatpickr(refs.dataPicker, options);

refs.button.addEventListener('click', onStartClick);

function onStartClick(event) {
  event.preventDefault;
  refs.button.disabled = true;

  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = targetDate - currentTime;
    if (deltaTime <= 0) {
      return;
};
    const timerData = convertMs(deltaTime);
    updateTimerFields(timerData);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

function updateTimerFields(timerData) {
  refs.days.textContent = timerData.days;
  refs.hours.textContent = timerData.hours;
  refs.minutes.textContent = timerData.minutes;
  refs.seconds.textContent = timerData.seconds;
};

