import { ajaxController } from './utils/index.js';

const test = async () => {
  const reqParam = {
    url: '/assets/movieList.json',
  };
  const testObj = new ajaxController(reqParam);
  const result = await testObj.call();
  console.log(result);
};
test();