import renderer from './renderer.js';
import imageItem from './imageItem.js';
import { getData } from './utils/index.js'

const dataURL = 'https://picsum.photos/v2/list';
const reqParam = {
  url: dataURL,
  data:{
    page: 1,
    limit:100
  }
};

export default class list extends renderer{
  constructor(arg) {
    super(arg);
  }
  async renderChildren() {
    const data = await getData(reqParam);
    for (const [index, item] of data.entries()) {
      await new imageItem({
        wrapper: this.dom,
        props: {index, item}
      }).render();
    }
  }
  template() {
    return `<ul></ul>`;
  }
};