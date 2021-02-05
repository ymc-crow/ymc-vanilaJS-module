import renderer from './renderer.js';

export default class imageItem extends renderer{
  constructor(arg) {
    super(arg);
  }
  template() {
    return `
    <div class="item">
      <img src="${this.props.item.download_url}" />
    </div>
    `;
  }
};