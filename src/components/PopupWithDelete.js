import Popup from './Popup.js';


class PopupWithDelete extends Popup {
    constructor(popupSelector, { submitFormCallback }){
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
//        this._buttonSave = this._popup.querySelector('.popup__saved');
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    open(card, cardId) {
        super.open();
        this._card = card;
        this._id = cardId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormCallback(this._card, this._id);
        })
    }
}

export { PopupWithDelete };