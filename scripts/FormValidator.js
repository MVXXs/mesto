class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidate(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement);
          } else {
            this._hideInputError(inputElement);
          }
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
              this._checkInputValidate(inputElement);
              this._toggleButtonState();
            });
        });
    }

    _hasInvalidInput() {
        this._inputArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        return this._inputArray.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput()){
            this._buttonElement.classList.add(this._inactiveButtonClass);
          } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
          }
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }
}

export { FormValidator };