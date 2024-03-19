import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetime = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let userSelectedDate;
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < options.defaultDate) {
      iziToast.error({
        timeout: false,
        message: 'Please choose a date in the future',
        messageSize: '16px',
        maxWidth: '300px',
        position: 'topRight',
      });
    } else {
      btn.disabled = false;
      btn.addEventListener('click', btnHandler);
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function btnHandler() {
  btn.disabled = true;

  let intervalId;

  intervalId = setInterval(() => {
    let dif = userSelectedDate - new Date();

    if (dif <= 0) {
      datetime.disabled = false;
      clearInterval(intervalId);
    } else {
      datetime.disabled = true;
      const time = convertMs(dif);
      let seconds = time.seconds;
      let minutes = time.minutes;
      let hours = time.hours;
      let days = time.days;

      secondsField.textContent = addLeadingZero(String(seconds));
      minutesField.textContent = addLeadingZero(String(minutes));
      hoursField.textContent = addLeadingZero(String(hours));
      daysField.textContent = addLeadingZero(String(days));
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
