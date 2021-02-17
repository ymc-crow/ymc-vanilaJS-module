import renderer from './renderer.js';
import imageItem from './imageItem.js';
import { getData, lazyLoadImageIo, recycledInfiniteScroll } from './utils/index.js'

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
    const limitedData = data.slice(0, 28);
    for (const [index, item] of limitedData.entries()) {
      await new imageItem({
        wrapper: this.dom,
        props: {index, item, listData: data}
      }).render();
    }
  }
  afterRender() {
    const images = document.querySelectorAll('img');
    const listEl = document.querySelectorAll('li');
    images.forEach((el) => {
      lazyLoadImageIo.observe(el);
    });
    listEl.forEach((el) => {
      recycledInfiniteScroll.observe(el);
    });
  }
  template() {
    return `<ul></ul>`;
  }
};