import renderer from './renderer.js';

const WIDTH = 245;
const HEIGHT = 245;

export default class imageItem extends renderer{
  constructor(arg) {
    super(arg);
  }
  
  template() {
    return `
    <li
      index="${this.props.index}"
      key="${this.props.key}"
      style="position:relative; top:0px;"
      >
      <img
        src="http://placehold.it/${WIDTH}x${HEIGHT}&text=ready"
        data-src="${this.props.item.download_url}"
      />
    </li>
    `;
  }
};