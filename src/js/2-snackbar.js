import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = Number(form.querySelector('input[name="delay"]').value);
  const selectedValue = form.querySelector('input[name="state"]:checked').value;
  form.reset();
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
