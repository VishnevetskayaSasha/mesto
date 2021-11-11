import {initialCards} from "../components/cards-default.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js'

import "./index.css";

const popupProfile = document.querySelector(".popup_type_profile"); // попап редактирования профиля
const popupCards = document.querySelector(".popup_type_cards"); // попап добавления новых карточек
const popupFullScreen = document.querySelector(".popup_type_img") // попап фулскрин фотки

const popupOpenBnt = document.querySelector(".profile__button-edit"); // кнопка открытия попап редактирования профиля
//const popupCloseBnt = popupProfile.querySelector(".popup__button-close"); // кнопка закрытия попап редактирования профиля

const popupAddOpenBnt = document.querySelector(".profile__button-add"); // кнопка открытия попап добавления новых карточек
//const popupAddCloseBnt = popupCards.querySelector(".popup__button-close"); // кнопка закрытия попап добавления новых карточек

//const popupFullScreenOpen = document.querySelector(".element__foto"); // кнопка открытия попап фулскрин фотки
//const popupFullScreenClose = popupFullScreen.querySelector(".popup__button-close") // кнопка закрытия попап фулскрин фотки

//const deleteBnt = document.querySelectorAll(".element__delete"); // кнопка удаления карточек

const profName = document.querySelector(".profile__name"); // имя на странице 
const profDescription = document.querySelector(".profile__description"); // описание на странице

//const popupName = popupProfile.querySelector(".popup__input_type_name");  // форма имени
//const popupDescription = popupProfile.querySelector(".popup__input_type_description"); // форма описания 
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

// !!! Редактирование профиля !!!

// UserInfo для попапа редактирования профиля, отвечает за управление отображением информации имени и описания деятельности
const userInfoProfile = new UserInfo({
  userSelector: profName,
  infoSelector: profDescription
});

// PopupWithForm для попапа редактирования профиля (также экземпляр PopupWithForm создаем и для попапа добавляения карточки на страницу)
const popupProfileWithForm = new PopupWithForm ({
    popupSelector: popupProfile, 
    handleFormSubmit: (event) => {
    formSubmitHandler(event);
}
  })

// Открытие попапа редактирования профиля
const  popupProfileEdit = () => {
  userInfoProfile.getUserInfo(); // при открытии попапа отображать в инпутах информацию со страницы
  popupProfileValidator.resetValidation();
  popupProfileWithForm.open();
}

// Добавление новой информации на страницу  + закрытие
const formSubmitHandler = () => {
  userInfoProfile.setUserInfo(); // информация из инпутов попапа редактирования профиля переносится на страницу
  popupProfileWithForm.close();
}

popupProfile.addEventListener("submit", formSubmitHandler); 
popupOpenBnt.addEventListener('click', popupProfileEdit);

// !!! Карточки !!!

// Создание карточки 
const  addNewCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: (event) => {
      const popupFullScreenOpen = new PopupWithImage(item, popupFullScreen);
      popupFullScreenOpen.open(event) ;
    }
  }, ".cards-template"); // создадим экземпляр карточки
  const cardElement = card.generateCard();
  return cardElement;
};

// Добавление карточек
const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const element = addNewCard(item)
    cardsList.addItem(element)
  }
}, elementsList);
cardsList.renderItems()

// PopupWithForm для попапа добавляения карточки на страницу (также экземпляр PopupWithForm создаем и для попапа редактирования профиля)
const popupCardsWithForm = new PopupWithForm ({
  popupSelector: popupCards,
  handleFormSubmit: (event) => {
    addElements(event) 
  }
})

//Открытие попапа добавления карточек 
const PopupCardsOpen = () => {
  popupCardsValidator.resetValidation();
  popupCardsWithForm.open();
}


//Функция дабавления информации из формы на страницу 
const  addElements = (event) => {
  //(); // чтоб страница не перезагружалась при отправке формы
  const newCardText = event.currentTarget.querySelector(".popup__input_type_title").value; // задаем название карточки 
  const newCardLink = event.currentTarget.querySelector(".popup__input_type_link").value; // задаем ссылку на карточку
  const newCards = { name: newCardText, link: newCardLink};

  const elementCard = addNewCard(newCards);
  elementsList.prepend(elementCard); // добавляем элемент на страницу
  event.currentTarget.reset(); // чтоб в полях не сохранялись введенные данные  
  popupCardsWithForm.close(); //  чтоб автоматом закрывался popup после нажатия на "Создать"
}

contentForm.addEventListener("submit", addElements); 
popupAddOpenBnt.addEventListener ('click', PopupCardsOpen)



// !!! Для каждой проверяемой формы создаем экземпляр класса FormValidator !!! 

// FormValidator для попапа редактирования профиля
const popupProfileValidator = new FormValidator (config, contentProfile);
popupProfileValidator.enableValidation();

// FormValidator для попапа добавляения карточки на страницу
const popupCardsValidator = new FormValidator (config, contentForm);
popupCardsValidator.enableValidation();

