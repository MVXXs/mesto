let btnPopupOpen = document.querySelector(".profile__button-edit");
let popupContainer = document.querySelector(".popup");
let btnPopupClose = document.querySelector(".popup__closed")

btnPopupOpen.addEventListener("click", popupOpen);
btnPopupClose.addEventListener("click", popupClose);

function popupOpen() {
    popupContainer.classList.add("popup_opened");
}

function popupClose() {
    popupContainer.classList.remove("popup_opened");
}


let TitleDefaultText = document.querySelector(".profile__title");
let SubtitleDefaultText = document.querySelector(".profile__subtitle");
let inputName = document.querySelector("#name");
let inputAbout = document.querySelector("#about");

inputName.value = TitleDefaultText.textContent;
inputAbout.value = SubtitleDefaultText.textContent;


let btnSaved = document.querySelector(".popup__saved");

btnSaved.addEventListener('click', infoSave);

function infoSave(evt) {
    evt.preventDefault();
    TitleDefaultText.textContent = inputName.value;
    SubtitleDefaultText.textContent = inputAbout.value;

    return popupClose();
}
