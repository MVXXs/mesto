import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import './index.css';
import { validationConfig, apiInfo } from '../utils/utils.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';

const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');
const avatarEditPopup = document.querySelector('.popup_type_avatar');

const btnEditProfilePopupOpen = document.querySelector('.profile__button-edit');

const inputNameProfilePopup = document.querySelector('.popup__input_type_name'); 
const inputAboutProfilePopup = document.querySelector('.popup__input_type_about');
const btnCardAddPopupOpen = document.querySelector('.profile__add-button');
const btnEditAvatar = document.querySelector('.profile__avatar');

const elementsSection = document.querySelector('.elements');

const imagePopup = new PopupWithImage('.popup_type_image');

const api = new Api (apiInfo);

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then ((res) => {
    const [items, userIden] = res;
    userId = userIden._id;
    cardRender.renderer(items, userId);
    userInfo.setUserInfo(userIden);
    userInfo.setUserAvatar(userIden);
})

const createCard = (data, user) => {
  const card = new Card({data,
    handleCardClick: () => {
      imagePopup.open(data);
    },
    handleDeleteCard: (card, cardId) => {
      popupDeleteNotice.open(card, cardId);
    },
    handleCardLike: (cardId) => {
      api.setLike(cardId)
      .then((item) => {
        card.viewLikes(item);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    },
    handleDeleteLike: (cardId) => {
      api.deleteLike(cardId)
      .then((item) => {
        card.viewLikes(item);
      })
      .catch((err) => { 
        console.log(`Ошибка: ${err}`);
      })
    }, userId: user}, '#cards');

  return card.generateCard();
}

const cardRender = new Section({
  renderer: (item, user) => {
    cardRender.addItem(createCard(item, user))
  }
}, elementsSection)

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__image'
})

const popupEditProfile = new PopupWithForm('.popup_type_edit', {
  submitFormCallback: (data) => {
    popupEditProfile.changeButtonText(true);
    api.editUserInfo(data)
    .then((item) => {
      userInfo.setUserInfo(item);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.changeButtonText(false);
    })
  }
})

const popupAddCard = new PopupWithForm('.popup_type_add', {
  submitFormCallback: (data) => {
      popupAddCard.changeButtonText(true);
      api.addNewCard(data)
      .then((card) => {
        cardRender.addItem(createCard(card, userId))
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCard.changeButtonText(false);
      })
    }
})

const popupEditAvatar = new PopupWithForm('.popup_type_avatar', {
  submitFormCallback: (data) => {
    popupEditAvatar.changeButtonText(true);
    api.editAvatar(data)
    .then((link) => {
      userInfo.setUserAvatar(link);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditAvatar.changeButtonText(false);
    })
  }
})

const popupDeleteNotice = new PopupWithDelete('.popup_type_delete', {
  submitFormCallback: (card, cardId) => {
    api.deleteCard(cardId)
    .then(() => {
      console.log(card);
      card.handleDeleteCard();
      popupDeleteNotice.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }
})

const profileEditValidation = new FormValidator(validationConfig, profileEditPopup);
profileEditValidation.enableValidation();

const cardAddValidation = new FormValidator(validationConfig, cardAddPopup);
cardAddValidation.enableValidation();

const avatarEditValidation = new FormValidator(validationConfig, avatarEditPopup);
avatarEditValidation.enableValidation();

btnEditProfilePopupOpen.addEventListener('click', () => {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  inputNameProfilePopup.value = data.name; 
  inputAboutProfilePopup.value = data.about;
})

btnCardAddPopupOpen.addEventListener('click', () => {
  popupAddCard.open();
  cardAddValidation.resetValidation();
})

btnEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarEditValidation.resetValidation();
})

imagePopup.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteNotice.setEventListeners();
popupEditAvatar.setEventListeners();