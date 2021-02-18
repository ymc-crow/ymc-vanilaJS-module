import renderer from './renderer.js';
import imageItem from './imageItem.js';
import { getData, lazyLoadImageIo, recycledInfiniteScroll } from './utils/index.js';

export const ROW_NUM = 4;
export const COLUMN_NUM = 7;

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
    this.data = await getData(reqParam);
    const limitedData = this.data.slice(0, ROW_NUM * COLUMN_NUM);
    this.itemObjList = [];
    for (const [index, item] of limitedData.entries()) {
      const dom = this.dom;
      const itemObj = new imageItem({
        wrapper: dom,
        props: { index, key: index, item }
      });
      this.itemObjList.push(itemObj);
      await itemObj.render();
    }
  }
  afterRender() {
    const images = document.querySelectorAll('img');
    const listEl = document.querySelectorAll('li');
    const lazyLoadImageIoObj = lazyLoadImageIo();
    const recycledInfiniteScrollObj = recycledInfiniteScroll({
      listData: this.data,
      itemObjs: this.itemObjList,
    });
    images.forEach((el) => {
      lazyLoadImageIoObj.observe(el);
    });
    listEl.forEach((el) => {
      recycledInfiniteScrollObj.observe(el);
    });
  }
  template() {
    return `<ul></ul>`;
  }
};