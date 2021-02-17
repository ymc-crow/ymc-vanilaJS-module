import renderer from './renderer.js';

export default class imageItem extends renderer{
  constructor(arg) {
    super(arg);
  }
  template() {
    return `
    <li index="${this.props.index}">
      <img src="${'http://placehold.it/120x120&text=ready'}" data-src="${this.props.item.download_url}" />
    </li>
    `;
  }
};