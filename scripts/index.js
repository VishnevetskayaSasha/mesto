const popup = document.querySelector(".popup__container");
const popupOpenBnt = document.querySelector(".profile__button-edit");
const popupCloseBnt = popup.querySelector(".popup__button-close");

const like = document.querySelectorAll(".element__like");

const profName = document.querySelector(".profile__name");
const profDescription = document.querySelector(".profile__description");

const formElement = document.querySelector(".popup__container");
const popupName = formElement.querySelector(".popup__name");
const popupDescription = formElement.querySelector(".popup__description");
const saveBnt = formElement.querySelector(".popup__button-save");

function popupToggle() {
  popup.classList.toggle("popup_open");
}

popupOpenBnt.addEventListener("click", popupToggle);
popupCloseBnt.addEventListener("click", popupToggle);

function likeToggle (event) {
  event.target.classList.toggle("element__like_black");
}

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener("click", likeToggle);
}

function formSubmitHandler(event) {
  event.preventDefault();
  profName.textContent=popupName.value;
  profDescription.textContent=popupDescription.value;
  popupToggle();
}

formElement.addEventListener("submit", formSubmitHandler);


