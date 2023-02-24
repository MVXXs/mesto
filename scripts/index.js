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

function saveInfo(evt) {
  evt.preventDefault();
  titleProfileDefaultText.textContent = inputNameProfilePopup.value;
  subtitleProfileDefaultText.textContent = inputAboutProfilePopup.value;

  closePopup(profileEditPopup);
}

function createCards(item) {
  const card = cardsTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');

  card.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = 'Фотография ' + item.name;

  card.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
  });

  card.querySelector('.element__delete').addEventListener('click', () => {
      card.remove();
  });

  cardImage.addEventListener('click', () => {
      openPopup(popupImage);
      imageContainer.src = item.link;
      textContainer.textContent = item.name;
      imageContainer.alt = 'Фотография ' + item.name;
  });

  return card;
}

function addCard(evt) {
  evt.preventDefault();
  const title = titleAddCard.value;
  const img = imageAddCard.value;

  const card = createCards({name: title, link: img})

  elementsSection.prepend(card);

  closePopup(cardAddPopup);
}

function renderCards () {
  const cards = initialCards.map((item) => {
      return createCards(item);
  });
  elementsSection.prepend(...cards);
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

btnEditProfilePopupOpen.addEventListener('click', () => {
  openPopup(profileEditPopup);
  inputNameProfilePopup.value = titleProfileDefaultText.textContent; 
  inputAboutProfilePopup.value = subtitleProfileDefaultText.textContent; 
});

btnEditProfilePopupClose.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

btnCardAddPopupOpen.addEventListener('click', () =>{
  openPopup(cardAddPopup);
  popupCardAddForm.reset();
  const btnCreate = popupCardAddForm.querySelector(validationConfig.submitButtonSelector);
  btnCreate.classList.add(validationConfig.inactiveButtonClass);
});

cardAddPopupClose.addEventListener('click', () => {
  closePopup(cardAddPopup);
});

imagePopupClose.addEventListener('click', () => {
  closePopup(popupImage);
});

popupProfileEditForm.addEventListener('submit', saveInfo);

popupCardAddForm.addEventListener('submit', addCard);

closePopupWithOverlay(popupImage);
closePopupWithOverlay(cardAddPopup);
closePopupWithOverlay(profileEditPopup);

renderCards();



 



  

