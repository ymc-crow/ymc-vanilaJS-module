import ajaxController from './ajaxController.js';

const getData = async reqParam => await new ajaxController(reqParam).call();

export default getData;