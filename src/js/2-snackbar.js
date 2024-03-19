import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', generatePromise);

function generatePromise(event) {
  event.preventDefault();

  const delay = parseInt(event.currentTarget.elements.delay.value);
  const state = event.currentTarget.elements.state.value;

  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    });

    promise
      .then(delay => {
        iziToast.success({
          title: 'Notification',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Notification',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      });
  }, delay);

  event.currentTarget.reset();
}
