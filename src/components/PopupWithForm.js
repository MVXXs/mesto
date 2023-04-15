import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, { submitFormCallback }) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._button = this._popupForm.querySelector('.popup__saved');
        this._buttonDefault = this._button.textContent;
    }

    _getInputValues() {
        this._inputObject = {};
        this._inputList.forEach((item) => {
            this._inputObject[item.name] = item.value;
        })
        return this._inputObject;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormCallback(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    changeButtonText(status) {
        status === true ? this._button.textContent = 'Сохранение...' : this._button.textContent = this._buttonDefault;
    }
}

export { PopupWithForm };