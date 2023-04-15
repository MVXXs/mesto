class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderer(items, user) {
        items.forEach(item => {
            this._renderer(item, user);
        })
    }

    addItem(item) {
        this._containerSelector.prepend(item);
    }
}

export { Section };