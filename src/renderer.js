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

    waiting() {
        return '';
    }

    afterRender() {

    }

    async #update() {
        this.dom.insertAdjacentHTML('afterend', this.waiting());
        this.waitingDom = this.dom.nextSibling;
        this.dom.remove();
        const template = await this.template();
        this.waitingDom.insertAdjacentHTML('afterend', template);
        this.dom = this.waitingDom.nextSibling;
        this.waitingDom.remove();
    }

    async #renderMe() {
        if (this.dom) return await this.#update();
        this.waitingDom = render(this.wrapper, this.waiting());
        this.dom = render(this.wrapper, await this.template());
        this?.waitingDom?.remove();
    }

    async render() {
        await this.#renderMe();
        await this.renderChildren();
        this.afterRender();
    }
};