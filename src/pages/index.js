import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithSubmit} from "../components/PopupWithSubmit.js"
import {UserInfo} from '../components/UserInfo.js';
import {Api} from "../components/Api.js"
import {
  popupProfile,
  popupCards,
  popupFullScreen,
  popupDelete,
  popupAvatar,
  popupOpenBnt,
  popupAddOpenBnt,
  popupAvatarOpenBnt,
  popupInputAvatar,
  avatar,
  profName,
  profDescription,
  popupName,
  popupDescription,
  elementsList,
  contentForm,
  contentProfile,
  contentAvatar,
  cardName,
  cardLink,
  config
} from "../utils/constants.js"
import "./index.css";

// Api
const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-30/",
  headers: {
    'Content-Type': 'application/json', // наш сервер ждет именно эту строчку (данные в формате json), некоторым серверам он не нужен для ответа
    authorization: "d54a6214-ca5f-4e1d-b1a3-3d2e1fdbd500",
  } 
})

// Инициализация Section для генерации карточек, потом вызываем в Promise.all для рендеринга изначального массива + в popupCardsWithForm для добавления новых карточек
const cardsList = new Section ({
  renderer: (item) => {
    const element = addNewCard(item)
    cardsList.addItem(element)
  }
}, elementsList);

// !!! Редактирование профиля !!!

// UserInfo для попапа редактирования профиля, отвечает за управление отображением информации имени и описания деятельности
const userInfoProfile = new UserInfo({
  userSelector: profName,
  infoSelector: profDescription,
  avatarSelector: avatar
});

// PopupWithForm для попапа редактирования профиля (также экземпляр PopupWithForm создаем и для попапа добавляения карточки на страницу и попапа аватара)
const popupProfileWithForm = new PopupWithForm ({
  popupSelector: popupProfile,
  handleFormSubmit: () => { 
      // Добавление новой информации на страницу  + закрытие
      popupProfileWithForm.loading(true);
      api.editUserInfo({
        name: popupName.value,
        about: popupDescription.value,
        avatar: popupInputAvatar.value
      })
        .then((data) => {
          userInfoProfile.setUserInfo({
            name: data.name,
            about: data.about,
            avatar: data.avatar
          });
          popupProfileWithForm.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          popupProfileWithForm.loading(false)
        })
  }
});

  popupProfileWithForm.setEventListeners();

// Открытие попапа редактирования профиля
const  popupProfileEdit = () => {
  const getUserInfo = userInfoProfile.getUserInfo();
  popupName.value = getUserInfo.name // при открытии попапа отображать в инпутах информацию со страницы
  popupDescription.value = getUserInfo.about
  popupInputAvatar.value = getUserInfo.avatar


  popupProfileValidator.resetValidation();
  popupProfileWithForm.open();
}
 
popupOpenBnt.addEventListener('click', popupProfileEdit);

// !!! Аватар !!!

// PopupWithForm для попапа добавляения карточки на страницу (также экземпляр PopupWithForm создаем и для попапа редактирования профиля и попапа добавляения карточки на страницу)
const popupAvatarWithForm = new PopupWithForm ({
  popupSelector: popupAvatar,
  handleFormSubmit: () => {
  // Добавление нового аватара на страницу + закрытие
    popupAvatarWithForm.loading(true);
    api.editAvatar({
      avatar: popupInputAvatar.value
    })
    .then((data) => {
      userInfoProfile.setUserInfo(data);
    })
    .then(() => {
      popupAvatarWithForm.close()

    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAvatarWithForm.loading(false)
    })
  }
})
 
popupAvatarWithForm.setEventListeners();

// Открытие попапа редактирования аватара
const popupAvatarOpen = () => {
  popupAvatarValidator.resetValidation();
  popupAvatarWithForm.open()
}

popupAvatarOpenBnt.addEventListener('click', popupAvatarOpen);


// !!! Карточки !!!
const popupFullScreenOpen = new PopupWithImage(popupFullScreen)
popupFullScreenOpen.setEventListeners();

const popupConfirmationDelete = new PopupWithSubmit(popupDelete)
popupConfirmationDelete.setEventListeners();

// Создание карточки 
const  addNewCard = (data) => {
  const card = new Card ({
    data,
    userId,
    handleCardClick: (name, link) => {
      popupFullScreenOpen.open(name, link)
    },
     handleDeleteIconClick: (cardId) => {
        popupConfirmationDelete.open();
        popupConfirmationDelete.setFormSubmit(() => {
          popupConfirmationDelete.loading(true);
           api.deleteCard(cardId)
            .then((responce) => {
              popupConfirmationDelete.close()
              card.deliteCard(responce)
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
              popupConfirmationDelete.loading(false);
            })
        })
    },
    handleLikeClick: (cardId) => {
      api.addLike(cardId)
        .then((responce) => {
          card.like(responce);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    },
    handleLikeDelete: (cardId) => {
      api.deleteLike(cardId)
      .then((response) => {
        card.like(response);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    },
  }, ".cards-template");
  const cardElement = card.generateCard();
  return cardElement;
}

// PopupWithForm для попапа добавляения карточки на страницу (также экземпляр PopupWithForm создаем и для попапа редактирования профиля и попапа аватара)
const popupCardsWithForm = new PopupWithForm ({
  popupSelector: popupCards,
  handleFormSubmit:() => {
    popupCardsWithForm.loading(true);
    api.addNewCards({
      name: cardName.value,
      link: cardLink.value
    })
    .then((data) => {
    const element = addNewCard(data)
     cardsList.addNewItem(element);
    })
    .then(() => {
      popupCardsWithForm.close(); 
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupCardsWithForm.loading(false)
    })
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

// // FormValidator для попапа редактирования аватара
const popupAvatarValidator = new FormValidator (config, contentAvatar);
popupAvatarValidator.enableValidation();

let userId;

// Получаем данные с сервера (Данные профиля + данные карточек)
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfoProfile.setUserInfo(user);;
    // карточки с сервера 
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

