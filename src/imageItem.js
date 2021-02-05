import renderer from './renderer.js';

export default class imageItem extends renderer{
  constructor(arg) {
    super(arg);
  }
  template() {
    return `
    <li>
      <img src="${this.props.item.download_url}" />
    </li>
    `;
  }
};