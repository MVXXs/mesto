let btnPopupOpen = document.querySelector(".profile__button-edit");
let popupContainer = document.querySelector(".popup");
let btnPopupClose = document.querySelector(".popup__closed")
let titleDefaultText = document.querySelector(".profile__title");
let subtitleDefaultText = document.querySelector(".profile__subtitle");
let inputName = document.querySelector(".popup__input_type_name");
let inputAbout = document.querySelector(".popup__input_type_about");

btnPopupOpen.addEventListener("click", popupOpen);
btnPopupClose.addEventListener("click", popupClose);

function popupOpen() {
    popupContainer.classList.add("popup_opened");
    inputName.value = titleDefaultText.textContent;
    inputAbout.value = subtitleDefaultText.textContent;
}

function popupClose() {
    popupContainer.classList.remove("popup_opened");
}

let popupForm = document.querySelector(".popup__form");

popupForm.addEventListener('submit', infoSave);

function infoSave(evt) {
    evt.preventDefault();
    titleDefaultText.textContent = inputName.value;
    subtitleDefaultText.textContent = inputAbout.value;

    return popupClose();
}
