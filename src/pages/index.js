import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import './index.css';
import { initialCards, validationConfig } from '../utils/utils.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');

const btnEditProfilePopupOpen = document.querySelector('.profile__button-edit');

const inputNameProfilePopup = document.querySelector('.popup__input_type_name'); 
const inputAboutProfilePopup = document.querySelector('.popup__input_type_about');
const btnCardAddPopupOpen = document.querySelector('.profile__add-button');

const elementsSection = document.querySelector('.elements');

const imagePopup = new PopupWithImage('.popup_type_image');

const createCard = (data) => {
  const card = new Card({data,
    handleCardClick: () => {
      imagePopup.open(data);
    }}, '#cards');

  return card.generateCard();
}

const cardRender = new Section({
  items: initialCards,
  renderer: (item) => {
    cardRender.addItem(createCard(item))
  }
}, elementsSection)

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle'
})

const popupEditProfile = new PopupWithForm('.popup_type_edit', {
  submitFormCallback: (data) => {
    userInfo.setUserInfo({name: data.name, about: data.about});
    popupEditProfile.close();
  }
})

const popupAddCard = new PopupWithForm('.popup_type_add', {
  submitFormCallback: (data) => {
    const card = createCard({name: data.name, link: data.about});
    cardRender.addItem(card);
    popupAddCard.close();
  }
})

const profileEditValidation = new FormValidator(validationConfig, profileEditPopup);
profileEditValidation.enableValidation();

const cardAddValidation = new FormValidator(validationConfig, cardAddPopup);
cardAddValidation.enableValidation();

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

cardRender.renderer();
imagePopup.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();