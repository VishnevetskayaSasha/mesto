import {initialCards} from "./cards-default.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const popupProfile = document.querySelector(".popup_type_profile"); // попап редактирования профиля
const popupCards = document.querySelector(".popup_type_cards"); // попап добавления новых карточек
const popupFullScreen = document.querySelector(".popup_type_img") // попап фулскрин фотки

const popupOpenBnt = document.querySelector(".profile__button-edit"); // кнопка открытия попап редактирования профиля
const popupCloseBnt = popupProfile.querySelector(".popup__button-close"); // кнопка закрытия попап редактирования профиля

const popupAddOpenBnt = document.querySelector(".profile__button-add"); // кнопка открытия попап добавления новых карточек
const popupAddCloseBnt = popupCards.querySelector(".popup__button-close"); // кнопка закрытия попап добавления новых карточек

 //const popupFullScreenOpen = document.querySelector(".element__foto"); // кнопка открытия попап фулскрин фотки
 const popupFullScreenClose = popupFullScreen.querySelector(".popup__button-close") // кнопка закрытия попап фулскрин фотки

//const deleteBnt = document.querySelectorAll(".element__delete"); // кнопка удаления карточек

const profName = document.querySelector(".profile__name"); // имя на странице 
const profDescription = document.querySelector(".profile__description"); // описание на странице

const popupName = popupProfile.querySelector(".popup__input_type_name");  // форма имени
const popupDescription = popupProfile.querySelector(".popup__input_type_description"); // форма описания 
//const saveBnt = popupProfile.querySelector(".popup__button_type_save"); // кнопка сохранения изменений профиля

//const createBnt = popupCards.querySelector(".popup__button_type_create"); // кнопка публикации новой карточки 

//const cardsTemplate = document.querySelector(".cards-template"); // блок Template
const elementsList = document.querySelector(".elements__list"); // контейнер списка 
const contentForm =  popupCards.querySelector(".popup__container") //форма попапа для добавления новых карточек
const contentProfile = popupProfile.querySelector(".popup__container") //форма попапа редактирования профиля
 
const config = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input_valid_false",
  errorClass: "error"
} 

// !!! Для каждой проверяемой формы создаем экземпляр класса FormValidator !!! 

// FormValidator для попапа редактирования профиля
const popupProfileValidator = new FormValidator (config, contentProfile);
popupProfileValidator.enableValidation();

// FormValidator для попапа добавляения карточки на страницу
const popupCardsValidator = new FormValidator (config, contentForm);
popupCardsValidator.enableValidation();

// !!! Карточки !!!

// Создание карточки 
function addNewCard(item) {
  const card = new Card(item, ".cards-template"); // создадим экземпляр карточки
  const cardElement = card.generateCard();
  return cardElement;
};

 // Добавление карточек
 function addCards(item) {
  const cardElement = addNewCard(item);
  elementsList.prepend(cardElement);
}

//Загрузка массива карточек на страницу
initialCards.forEach((item) => {
  elementsList.append(addNewCard(item));
});

//Открытие попапа добавления карточек 
function toggleModalPopupCards() {
  toggleModal(popupCards);
  popupCardsValidator.resetValidation();
}

//Функция дабавления информации из формы на страницу 
function addElements(event) {
  event.preventDefault(); // чтоб страница не перезагружалась при отправке формы
  const newCardText = event.currentTarget.querySelector(".popup__input_type_title").value; // задаем название карточки 
  const newCardLink = event.currentTarget.querySelector(".popup__input_type_link").value; // задаем ссылку на карточку
  const newCards = { name: newCardText, link: newCardLink};

  const elementCard = addNewCard(newCards);
  elementsList.prepend(elementCard); // добавляем элемент на страницу
  event.currentTarget.reset(); // чтоб в полях не сохранялись введенные данные  
  toggleModal(popupCards); //  чтоб автоматом закрывался popup после нажатия на "Создать"
}

contentForm.addEventListener("submit", addElements); 

// !!! Универсальное открытие-закрытие попапов !!!
function toggleModal(modal) {
  modal.classList.toggle("popup_open"); // Метод toggle работает как add, если у элемента класс отсутствует, и как remove — если присутствует
  if (modal.classList.contains("popup_open")) { // если попап открыт 
    document.addEventListener("keydown", escClose); // добавляем обработчик
  } else { // в ином случа
    document.removeEventListener("keydown", escClose); // удаляем 
  }
}

popupOpenBnt.addEventListener("click", () => popupProfileEdit(popupProfile));
popupCloseBnt.addEventListener("click", () => toggleModal(popupProfile));
popupAddOpenBnt.addEventListener("click", () => toggleModalPopupCards(popupCards));
popupAddCloseBnt.addEventListener("click", () => toggleModal(popupCards));
popupFullScreenClose.addEventListener("click", () => toggleModal(popupFullScreen));

//  !!! Попап редактирования профиля !!!

// Открытие попапа 
function popupProfileEdit() {
  toggleModal(popupProfile);
  popupName.value=profName.textContent;
  popupDescription.value=profDescription.textContent;
  popupProfileValidator.resetValidation();
}

// Добавление новой информации в поля профиля + закрытие
function formSubmitHandler(event) {
  event.preventDefault();
  profName.textContent=popupName.value;
  profDescription.textContent=popupDescription.value;
  toggleModal(popupProfile);
}

popupProfile.addEventListener("submit", formSubmitHandler); 


// закрытие попап при нажатии на esc 
function escClose(event) {
  if (event.key === "Escape") { // если нажата клавиша esc
    const popupАctive = document.querySelector(".popup_open"); // находим открытый попап, открытый попап нужно находить только после нажатия на Escape
    toggleModal(popupАctive);  // удалить класс popup_open у найденного открытого попапа 
  }
} 

// закрытие попап при клике на оверлей 
function overlayClose(event) {
  if (event.target === event.currentTarget) {
    toggleModal(event.target);
  }
}

popupProfile.addEventListener("click", overlayClose);
popupCards.addEventListener("click", overlayClose);
popupFullScreen.addEventListener("click", overlayClose); 


export {toggleModal, popupFullScreen};