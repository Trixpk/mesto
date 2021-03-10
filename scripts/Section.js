export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this._clear();
        
        this._items.forEach(item => {
            const cardElement = this._renderer(item);
            this.addItem(cardElement);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}