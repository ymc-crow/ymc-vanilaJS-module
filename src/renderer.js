import { render } from './utils/index.js'

export default class renderer {
    constructor({ wrapper, props }={} ) {
        this.wrapper = wrapper;
        this.props = props;
    }

    template() {
        throw new Error(`template method must be implemeted in "${this.__proto__.constuctor.name}" Class use this.prop(${this.props}) when draw`);
    }

    renderChildren() {
        return null;
    }

    async #renderMe() {
        this.dom = render(this.wrapper, await this.template());
    }

    async render() {
        await this.#renderMe();
        await this.renderChildren();
    }
};