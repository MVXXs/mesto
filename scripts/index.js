let btnPopupOpen = document.querySelector(".profile__button-edit");
let popupContainer = document.querySelector(".popup");
let btnPopupClose = document.querySelector(".popup__closed")
let TitleDefaultText = document.querySelector(".profile__title");
let SubtitleDefaultText = document.querySelector(".profile__subtitle");
let inputName = document.querySelector(".popup__input_type_name");
let inputAbout = document.querySelector(".popup__input_type_about");

btnPopupOpen.addEventListener("click", popupOpen);
btnPopupClose.addEventListener("click", popupClose);

function popupOpen() {
    popupContainer.classList.add("popup_opened");
    inputName.value = TitleDefaultText.textContent;
    inputAbout.value = SubtitleDefaultText.textContent;
}

function popupClose() {
    popupContainer.classList.remove("popup_opened");
}

let popupForm = document.querySelector(".popup__form");

popupForm.addEventListener('submit', infoSave);

function infoSave(evt) {
    evt.preventDefault();
    TitleDefaultText.textContent = inputName.value;
    SubtitleDefaultText.textContent = inputAbout.value;

    return popupClose();
}
