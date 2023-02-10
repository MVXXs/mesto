const btnPopupOpen = document.querySelector(".profile__button-edit");
const popupContainerEdit = document.querySelector(".popup__type_edit");
const btnPopupClose = document.querySelector(".popup__closed")
const titleDefaultText = document.querySelector(".profile__title");
const subtitleDefaultText = document.querySelector(".profile__subtitle");
const inputName = document.querySelector(".popup__input_type_name");
const inputAbout = document.querySelector(".popup__input_type_about");
const btnPopupAddOpen = document.querySelector(".profile__add-button");
const popupContainerAdd = document.querySelector(".popup__type_add");
const popupImg = document.querySelector('.popup__type_image');

btnPopupOpen.addEventListener("click", openPopup);
btnPopupClose.addEventListener("click", closePopup);
btnPopupAddOpen.addEventListener("click", () => {
    popupContainerAdd.classList.add("popup_opened");
})
popupContainerAdd.querySelector(".popup__closed").addEventListener("click", closePopup);
popupImg.querySelector('.popup__closed').addEventListener("click", closePopup);


function openPopup() {
    popupContainerEdit.classList.add("popup_opened");
    inputName.value = titleDefaultText.textContent;
    inputAbout.value = subtitleDefaultText.textContent;
}

function closePopup() {
    popupContainerEdit.classList.remove("popup_opened");
    popupContainerAdd.classList.remove("popup_opened");
    popupImg.classList.remove("popup_opened");
}

const popupForm = document.querySelector(".popup__form");

popupForm.addEventListener('submit', saveInfo);

function saveInfo(evt) {
    evt.preventDefault();
    titleDefaultText.textContent = inputName.value;
    subtitleDefaultText.textContent = inputAbout.value;

    return closePopup();
}

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  const templateCards = document.querySelector('#cards').content.querySelector('.element');
  const listElements = document.querySelector('.elements');
  const titleAddCard = document.querySelector('.popup__input_type_title');
  const imageAddCard = document.querySelector('.popup__input_type_link');
  const popupFormAdd = document.forms['add-card'];
  const popupText = document.querySelector('.element__title');
  const imgContainer = document.querySelector('.popup__image-container');

  popupFormAdd.addEventListener('submit', addCard);

  function createCards(item) {
    const card = templateCards.cloneNode(true);
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').src = item.link;

    card.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });

    card.querySelector('.element__delete').addEventListener('click', () => {
        card.remove();
    });

    card.querySelector('.element__image').addEventListener('click', () => {
        popupImg.classList.add('popup_opened');
        imgContainer.querySelector('.popup__img').src = item.link;
        imgContainer.querySelector('.popup__img-text').textContent = item.name;
    });

    return card;
}

  function addCard(evt) {
    evt.preventDefault();
    const title = titleAddCard.value;
    const img = imageAddCard.value;

    const card = createCards({name: title, link: img})

    listElements.prepend(card);

    card.querySelector('.element__image').addEventListener('click', () => {
        popupImg.classList.add('popup_opened');
        imgContainer.querySelector('.popup__img').src = img;
        imgContainer.querySelector('.popup__img-text').textContent = title;
    });

    return closePopup();
  }

  function renderCards () {
    const cards = initialCards.map((item) => {
        return createCards(item);
    })
    listElements.prepend(...cards);
  }

  renderCards();




 



  

