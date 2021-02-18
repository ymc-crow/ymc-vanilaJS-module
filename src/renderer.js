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
        return '<div></div>';
    }

    afterRender() {

    }

    async #update() {
        const waitingDom = this.waiting();
        this.dom.insertAdjacentHTML('afterend', waitingDom);
        this.waitingDom = this.dom.nextElementSibling;
        this.dom.remove();
        this.waitingDom.insertAdjacentHTML('afterend', await this.template());
        this.dom = this.waitingDom.nextElementSibling;
        this.waitingDom.remove();
    }

    async #renderMe() {
        if (this.dom) return await this.#update();
        const waitingDom = this.waiting();
        if (waitingDom) {
            this.waitingDom = render(this.wrapper, this.waiting());
        }
        this.dom = render(this.wrapper, await this.template());
        this?.waitingDom?.remove();
    }

    async render(props) {
        if (props) this.props = {...this.props, ...props };
        await this.#renderMe();
        await this.renderChildren();
        this.afterRender();
    }
};