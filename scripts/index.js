import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

const btnEditProfilePopupOpen = document.querySelector('.profile__button-edit');
const btnEditProfilePopupClose = document.querySelector('.popup__closed')
const titleProfileDefaultText = document.querySelector('.profile__title'); 
const subtitleProfileDefaultText = document.querySelector('.profile__subtitle');
const inputNameProfilePopup = document.querySelector('.popup__input_type_name'); 
const inputAboutProfilePopup = document.querySelector('.popup__input_type_about');
const btnCardAddPopupOpen = document.querySelector('.profile__add-button');
const inputTitleCardAddPopup = document.querySelector('.popup__input_type_title');
const inputLinkCardAddPopup = document.querySelector('.popup__input_type_link');

const cardsTemplate = document.querySelector('#cards').content.querySelector('.element');
const elementsSection = document.querySelector('.elements');
const titleAddCard = document.querySelector('.popup__input_type_title');
const imageAddCard = document.querySelector('.popup__input_type_link');
const popupProfileEditForm = document.forms['edit-profile'];
const popupCardAddForm = document.forms['add-card'];
const popupImageContainer = document.querySelector('.popup__image-container');
const imageContainer = popupImageContainer.querySelector('.popup__img');
const cardAddPopupClose = cardAddPopup.querySelector('.popup__closed');
const imagePopupClose = popupImage.querySelector('.popup__closed');
const textContainer = popupImageContainer.querySelector('.popup__img-text');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
} 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  titleProfileDefaultText.textContent = inputNameProfilePopup.value;
  subtitleProfileDefaultText.textContent = inputAboutProfilePopup.value;

  closePopup(profileEditPopup);
}

const createCard = (data) => {
  const card = new Card(data, '#cards', handleCardClick);

  return card.generateCard();
}

const handleCardClick = (item) => {
  openPopup(popupImage);
  imageContainer.src = item.link;
  textContainer.textContent = item.name;
  imageContainer.alt = 'Фотография ' + item.name;
}

initialCards.map((data) => {
  elementsSection.prepend(createCard(data));
})

const addCard = (data) => {
  elementsSection.prepend(createCard(data));
}

function closePopupWithOverlay(popup) {
 popup.addEventListener('click', (event) => {
    if(event.target === event.currentTarget){
      closePopup(popup);
    }
 });
}

function closePopupWithEsc(evt) {
    if (evt.key === 'Escape') {
      const popupClosing = document.querySelector('.popup_opened');
      closePopup(popupClosing);
    }
}

const profileEditValidation = new FormValidator(validationConfig, profileEditPopup);
profileEditValidation.enableValidation();

const cardAddValidation = new FormValidator(validationConfig, cardAddPopup);
cardAddValidation.enableValidation();

btnEditProfilePopupOpen.addEventListener('click', () => {
  openPopup(profileEditPopup);
  inputNameProfilePopup.value = titleProfileDefaultText.textContent; 
  inputAboutProfilePopup.value = subtitleProfileDefaultText.textContent;
  profileEditValidation.resetValidation();
});

btnEditProfilePopupClose.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

btnCardAddPopupOpen.addEventListener('click', () =>{
  openPopup(cardAddPopup);
  popupCardAddForm.reset();
  cardAddValidation.resetValidation();
});

cardAddPopupClose.addEventListener('click', () => {
  closePopup(cardAddPopup);
});

imagePopupClose.addEventListener('click', () => {
  closePopup(popupImage);
});

popupProfileEditForm.addEventListener('submit', saveProfileInfo);

popupCardAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard({
    name: titleAddCard.value,
    link: imageAddCard.value,
  })
  closePopup(cardAddPopup);
});

closePopupWithOverlay(popupImage);
closePopupWithOverlay(cardAddPopup);
closePopupWithOverlay(profileEditPopup);