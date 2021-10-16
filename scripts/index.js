const popups = document.querySelectorAll(".popup") // все попапы

const popupProfile = document.querySelector(".popup_type_profile"); // попап редактирования профиля
const popupCards = document.querySelector(".popup_type_cards"); // попап добавления новых карточек
const popupFullScreen = document.querySelector(".popup_type_img") // попап фулскрин фотки

const popupOpenBnt = document.querySelector(".profile__button-edit"); // кнопка открытия попап редактирования профиля
const popupCloseBnt = popupProfile.querySelector(".popup__button-close"); // кнопка закрытия попап редактирования профиля

const popupAddOpenBnt = document.querySelector(".profile__button-add"); // кнопка открытия попап добавления новых карточек
const popupAddCloseBnt = popupCards.querySelector(".popup__button-close"); // кнопка закрытия попап добавления новых карточек

 const popupFullScreenOpen = document.querySelector(".element__foto"); // кнопка открытия попап фулскрин фотки
 const popupFullScreenClose = popupFullScreen.querySelector(".popup__button-close") // кнопка закрытия попап фулскрин фотки

const deleteBnt = document.querySelectorAll(".element__delete"); // кнопка удаления карточек

const profName = document.querySelector(".profile__name"); // имя на странице 
const profDescription = document.querySelector(".profile__description"); // описание на странице

const popupName = popupProfile.querySelector(".popup__input_type_name");  // форма имени
const popupDescription = popupProfile.querySelector(".popup__input_type_description"); // форма описания 
const saveBnt = popupProfile.querySelector(".popup__button_type_save"); // кнопка сохранения изменений профиля

const createBnt = popupCards.querySelector(".popup__button_type_create"); // кнопка публикации новой карточки 

const cardsTemplate = document.querySelector(".cards-template"); // блок Template
const elementsList = document.querySelector(".elements__list"); // контейнер списка 
const contentForm =  popupCards.querySelector(".popup__container") //форма попапа для добавления новых карточек

const popupFoto = popupFullScreen.querySelector(".popup__foto"); // фотка  фулскрин попапа
const popupFotoName = popupFullScreen.querySelector(".popup__foto-name"); // текст фотки фулскрин попапа
 

const initialCards = [
  {
    name: "Карачаево-Черкесся",
    link: "images/karachaevsk.jpg"
  },
  {
    name: "Гора Эльбрус",
    link: "https://rusgeo.me/upload/medialibrary/dfd/image_5908719_1920-_1_.jpg"
  },
  {
    name: "Домбай",
    link: "https://c1.staticflickr.com/3/2857/34131350951_ae3b3c56b9_o.jpg"
  },
  {
    name: "Байкал",
    link: "images/baikal.jpg"
  },
  {
    name: "Петергоф",
    link: "images/peterhof.jpg"
  },
  {
    name: "Кунгурская пещера",
    link: "https://cs9.pikabu.ru/post_img/big/2017/05/28/7/1495967718126917689.jpg"
  },
];

addCards(initialCards);

// !!! Карточки !!!
// функция лайка
function likeToggle (event) {  
  event.target.classList.toggle("element__like_black");
}

// функция удаления
function delitCard(event) {
  const card = event.target.closest(".element");
  card.remove();
}

 function renderElements(item) {
    const newCards = cardsTemplate.content.cloneNode(true); // клонируем элемент
    newCards.querySelector(".element__name").textContent = item.name;  // название места из массива
    newCards.querySelector(".element__foto").src = item.link; // ссылка из массива
    newCards.querySelector(".element__foto").alt = item.name; // alt
    addCardАttribute(newCards);
    return newCards;
 }

 function addElements(event) {
    event.preventDefault(); // чтоб страница не перезагружалась при отправке формы
    const newCardText = event.currentTarget.querySelector(".popup__input_type_title").value; // задаем название карточки 
    const newCardLink = event.currentTarget.querySelector(".popup__input_type_link").value; // задаем ссылку на карточку
    const newCards = renderElements({ name: newCardText, link: newCardLink});
    elementsList.prepend(newCards); // добавляем элемент на страницу
    event.currentTarget.reset(); // чтоб в полях не сохранялись введенные данные  
    toggleModal(popupCards); //  чтоб автоматом закрывался popup после нажатия на "Создать"
    createBnt.setAttribute("disabled", "disabled");
    createBnt.classList.add("popup__button_invalid"); // блокировка кнопки 

 }

 contentForm.addEventListener("submit", addElements); 

 // функция добавления карточек
 function addCards(cards) {
  const newCards = cards.map(renderElements);
  elementsList.prepend(...newCards);
}

function addCardАttribute(card) {
  card.querySelector(".element__delete").addEventListener("click", delitCard); // для удаления
  card.querySelector(".element__like").addEventListener("click", likeToggle); // для лайка 
  card.querySelector(".element__foto").addEventListener("click", openPopupFull); // для открытия
}

// функция открытия на фулскрин
function openPopupFull (event) {
  toggleModal(popupFullScreen);
  popupFoto.src = event.target.src; // картинка
  popupFotoName.textContent = event.currentTarget.parentElement.querySelector(".element__name").textContent; // подпись 
  popupFoto.alt = event.currentTarget.parentElement.querySelector(".element__name").textContent; // alt к картинке
}


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
popupAddOpenBnt.addEventListener("click", () => toggleModal(popupCards));
popupAddCloseBnt.addEventListener("click", () => toggleModal(popupCards));
popupFullScreenClose.addEventListener("click", () => toggleModal(popupFullScreen));

//  !!! Попап редактирования профиля !!!
// Открытие попапа 
function popupProfileEdit() {
  toggleModal(popupProfile);
  popupName.value=profName.textContent;
  popupDescription.value=profDescription.textContent;
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
