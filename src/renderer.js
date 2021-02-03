export default class renderer {
    #wrapper;
    #content;
    #props;
    constructor({ wrapper, props }={} ) {
        this.#wrapper = wrapper;
        this.#props = props;
        this.#content = this.template();
    }
    template() {
        throw new Error(`template method must be implemeted in "${this.constuctor.name}" Class use this.#prop(${this.#props}) when draw`);
    }
    render() {
        const wrapper = this.#wrapper;
        const { insertAdjacentHTML } = wrapper;
        insertAdjacentHTML('beforeend', this.#content);
        return this.dom = wrapper.lastChild;
    }
}