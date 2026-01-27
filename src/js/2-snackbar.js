import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', event => {
  event.preventDefault();

  const delayInput = Number(document.querySelector('#delay-input').value);
  const selectedValue = document.querySelector(
    'input[name="state"]:checked'
  ).value;
  document.querySelector('.form').reset();

  const options = {
    timeout: delayInput,
    state: selectedValue,
  };

  const makePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options.state === 'fulfilled') {
        resolve(options.timeout);
      } else {
        reject(options.timeout);
      }
    }, options.timeout);
  });

  makePromise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
