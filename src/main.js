import ajaxController from './ajaxController.js';

const test = async () => {
  const reqParam = {
    url: '/src/assets/movieList.json',
  };
  const testObj = new ajaxController(reqParam);
  const result = await testObj.call();
  console.log(result);
};
test();