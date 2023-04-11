import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageContainer = this._popup.querySelector('.popup__img');
        this._textContainer = this._popup.querySelector('.popup__img-text');
    }

    open(item) {
        super.open();
        this._imageContainer.src = item.link;
        this._textContainer.textContent = item.name;
        this._imageContainer.alt = 'Фотография ' + item.name;
    }
}

export { PopupWithImage };