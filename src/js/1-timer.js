import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate <= Date.now()) {
      window.alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

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
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  const datetimeInput = document.querySelector('#datetime-picker');
  datetimeInput.setAttribute('disabled', true);

  const timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startBtn.removeAttribute('disabled');
      datetimeInput.removeAttribute('disabled');
      return;
    }

    const timeComponents = convertMs(timeDifference);
    updateTimer(timeComponents);
  }, 1000);
});
