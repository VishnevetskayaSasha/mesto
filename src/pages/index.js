import {initialCards} from "../utils/cards-default.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js'
import {
  popupProfile,
  popupCards,
  popupFullScreen,
  popupOpenBnt,
  popupAddOpenBnt,
  profName,
  profDescription,
  popupName,
  popupDescription,
  elementsList,
  contentForm,
  contentProfile,
  cardName,
  cardLink,
  config
} from "../utils/constants.js"
import "./index.css";

// !!! Редактирование профиля !!!

// UserInfo для попапа редактирования профиля, отвечает за управление отображением информации имени и описания деятельности
const userInfoProfile = new UserInfo({
  userSelector: profName,
  infoSelector: profDescription,
});

// PopupWithForm для попапа редактирования профиля (также экземпляр PopupWithForm создаем и для попапа добавляения карточки на страницу)
const popupProfileWithForm = new PopupWithForm ({
  popupSelector: popupProfile,
   handleFormSubmit: () => { 
      // Добавление новой информации на страницу  + закрытие
      userInfoProfile.setUserInfo(popupName.value, popupDescription.value); // информация из инпутов попапа редактирования профиля переносится на страницу
      popupProfileWithForm.close();
}
  });

  popupProfileWithForm.setEventListeners();

// Открытие попапа редактирования профиля
const  popupProfileEdit = () => {
  const data = userInfoProfile.getUserInfo();
  popupName.value = data.nameInfo // при открытии попапа отображать в инпутах информацию со страницы
  popupDescription.value = data.descriptionInfo

  popupProfileValidator.resetValidation();
  popupProfileWithForm.open();
}
 
popupOpenBnt.addEventListener('click', popupProfileEdit);

// !!! Карточки !!!

const popupFullScreenOpen = new PopupWithImage(popupFullScreen)
popupFullScreenOpen.setEventListeners();

// Создание карточки 
const  addNewCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupFullScreenOpen.open(item)
    },
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
  handleFormSubmit: () => {
    const item = {
      name: cardName.value,
      link: cardLink.value
    }
   const newCard = addNewCard(item)
    cardsList.addNewItem(newCard);
    popupCardsWithForm.close(); //  чтоб автоматом закрывался popup после нажатия на "Создать"
  }
})
popupCardsWithForm.setEventListeners();

//Открытие попапа добавления карточек 
const PopupCardsOpen = () => {
  popupCardsValidator.resetValidation();
  popupCardsWithForm.open();
}

popupAddOpenBnt.addEventListener ('click', PopupCardsOpen)

// !!! Для каждой проверяемой формы создаем экземпляр класса FormValidator !!! 

// FormValidator для попапа редактирования профиля
const popupProfileValidator = new FormValidator (config, contentProfile);
popupProfileValidator.enableValidation();

// FormValidator для попапа добавляения карточки на страницу
const popupCardsValidator = new FormValidator (config, contentForm);
popupCardsValidator.enableValidation();

