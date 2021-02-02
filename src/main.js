import ajaxController from './ajaxController.js';
console.log(ajaxController);
const test = async () => {
  const reqParam = {
    url: '/src/assets/movieList.json',
  };
  const testObj = new ajaxController(reqParam);
  const result = await testObj.call();
  console.log(result);
};
test();