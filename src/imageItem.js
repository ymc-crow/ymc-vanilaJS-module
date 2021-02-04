import renderer from './renderer.js';

export default class imageItem extends renderer{
  constructor(arg) {
    super(arg);
  }
  template() {
    return `<li>${this.props.index}</li>`;
  }
};