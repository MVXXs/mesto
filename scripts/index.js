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

function openPopup(popup) {
  popup.classList.add('popup_opened');
} 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function saveInfo(evt) {
  evt.preventDefault();
  titleProfileDefaultText.textContent = inputNameProfilePopup.value;
  subtitleProfileDefaultText.textContent = inputAboutProfilePopup.value;

  closePopup(profileEditPopup);
}

function createCards(item) {
  const card = cardsTemplate.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = 'Фотография ' + item.name;

  card.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
  });

  card.querySelector('.element__delete').addEventListener('click', () => {
      card.remove();
  });

  card.querySelector('.element__image').addEventListener('click', () => {
      openPopup(popupImage);
      popupImageContainer.querySelector('.popup__img').src = item.link;
      popupImageContainer.querySelector('.popup__img-text').textContent = item.name;
      popupImageContainer.querySelector('.popup__img').alt = 'Фотография ' + item.name;
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

function closePopupWithEsc(popup) {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
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
  inputTitleCardAddPopup.value = '';
  inputLinkCardAddPopup.value = '';
});

cardAddPopup.querySelector('.popup__closed').addEventListener('click', () => {
  closePopup(cardAddPopup);
});

popupImage.querySelector('.popup__closed').addEventListener('click', () => {
  closePopup(popupImage);
});

popupProfileEditForm.addEventListener('submit', saveInfo);

popupCardAddForm.addEventListener('submit', addCard);

popupImage.addEventListener('keydown', closePopupWithEsc(popupImage));
cardAddPopup.addEventListener('keydown', closePopupWithEsc(cardAddPopup));
profileEditPopup.addEventListener('keydown', closePopupWithEsc(profileEditPopup));


closePopupWithOverlay(popupImage);
closePopupWithOverlay(cardAddPopup);
closePopupWithOverlay(profileEditPopup);



renderCards();



 



  

