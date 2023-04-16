class Card {
    constructor({ data, handleCardClick, handleDeleteCard, handleCardLike, handleDeleteLike, userId }, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardData = data;
        this._id = data._id;
        this._handleDeleteCard = handleDeleteCard;
        this._setLike = handleCardLike;
        this._deleteLike = handleDeleteLike;

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
        this._elementCounter = this._element.querySelector('.element__counter');

        this.viewLikes(this._cardData);

        if(this._ownerId !== this._userId){
            this._elementDelete.remove();
        }

        this._setEventListeners();
        return this._element;
    }

    viewLikes(card) {
        this._cardLikes = card.likes;
        this._cardLikes.length === 0 ? this._elementCounter.textContent = '0' : this._elementCounter.textContent = this._cardLikes.length;
        this._checkLike() ? this._elementLike.classList.add('element__like_active') : this._elementLike.classList.remove('element__like_active');
    }

    _checkLike() {
        return this._cardLikes.find((like) => like._id === this._userId) 
    }

    toggleButtonLike() {
        this._elementLike.classList.toggle('element__like_active');
    }

    _handleLikeCard() {
        this._elementLike.classList.contains('element__like_active') ? this._deleteLike(this._id) : this._setLike(this._id);
    }

    handleDeleteCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._handleLikeCard();
        })
        this._elementDelete.addEventListener('click', () => {
            this._handleDeleteCard(this, this._id);
        })
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick({
                link: this._link,
                name: this._name,
            })
        })
    }
}

export { Card };