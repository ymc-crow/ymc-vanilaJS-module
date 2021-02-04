import list from './list.js';

const start = async () => {
  await new list({
    wrapper: document.querySelector('#root')
  }).render();
};
start();