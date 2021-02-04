import renderer from './renderer.js';
import imageItem from './imageItem.js';
import { getData } from './utils/index.js'

const dataURL = '/assets/movieList.json';
const reqParam = { url: dataURL };

export default class list extends renderer{
  constructor(arg) {
    super(arg);
  }
  async renderChildren() {
    const data = await getData(reqParam);
    console.log(data);
    for (const [index, item] of data.movies.entries()) {
      await new imageItem({
        wrapper: this.dom,
        props: {index}
      }).render();
    }
  }
  template() {
    return `<ul></ul>`;
  }
};