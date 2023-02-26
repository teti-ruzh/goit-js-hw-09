import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};


refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
  event.preventDefault();

let amount = Number(refs.amount.value);
let delay = Number(refs.delay.value);
let step = Number(refs.step.value);

  for (let i=0; i < amount; i+=1) {
    let notificationDelay = delay + step * i;
    createPromise(i+1, notificationDelay);
    }
}

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise ${position} in ${delay}ms`)
        }
      }, delay)
    }).then(resolve => Notify.success(resolve)).catch(reject => Notify.failure(reject))
  }
