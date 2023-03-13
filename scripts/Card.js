class Card {
    constructor(data, templateSelector, imageOpen) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._imageOpen = imageOpen;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.element__title').textContent = this._name;
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementLike = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__delete');

        this._setEventListeners();
        return this._element;
      }

    _handleLikeCard() {
        this._elementLike.classList.toggle('element__like_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._handleLikeCard();
        })
        this._elementDelete.addEventListener('click', () => {
            this._handleDeleteCard();
        })
        this._elementImage.addEventListener('click', () => {
            this._imageOpen({
                link: this._link,
                name: this._name,
            })
        })
    }
}

export { Card };