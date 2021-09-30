const popupProfile = document.querySelector(".popup__container_type_profile"); // попап редактирования профиля
const popupCards = document.querySelector(".popup__container_type_cards"); // попап добавления новых карточек
const popupFullScreen = document.querySelector(".popup__container_type_img") // попап фулскрин фотки

const popupOpenBnt = document.querySelector(".profile__button-edit"); // кнопка открытия попап редактирования профиля
const popupCloseBnt = popupProfile.querySelector(".popup__button-close"); // кнопка закрытия попап редактирования профиля

const popupAddOpenBnt = document.querySelector(".profile__button-add"); // кнопка открытия попап добавления новых карточек
const popupAddCloseBnt = popupCards.querySelector(".popup__button-close"); // кнопка закрытия попап добавления новых карточек

 const popupFullScreenOpen = popupFullScreen.querySelector(".element__foto"); // кнопка открытия попап фулскрин фотки
 const popupFullScreenClose = popupFullScreen.querySelector(".popup__button-close") // кнопка закрытия попап фулскрин фотки

const deleteBnt = document.querySelectorAll(".element__delete"); // кнопка удаления карточек

const profName = document.querySelector(".profile__name"); // имя на странице 
const profDescription = document.querySelector(".profile__description"); // описание на странице

const popupName = popupProfile.querySelector(".popup__input_type_name");  // форма имени
const popupDescription = popupProfile.querySelector(".popup__input_type_description"); // форма описания 
const saveBnt = popupProfile.querySelector(".popup__button_type_save"); // кнопка сохранения изменений профиля

let createBnt = popupCards.querySelector(".popup__button_type_create"); // кнопка публикации новой карточки 

const cardsTemplate = document.querySelector(".cards-template"); // блок Template
const elementsList = document.querySelector(".elements__list"); // контейнер списка 
const contentForm =  popupCards.querySelector(".popup__content") //форма попапа для добавления новых карточек

 const popuoFoto = popupFullScreen.querySelector(".popup__foto"); // фотка  фулскрин попапа
const popupFotoName = popupFullScreen.querySelector(".popup__foto-name"); // текст фотки фулскрин попапа


const initialCards = [
  {
    name: "Карачаево-Черкесся",
    link: "images/karachaevsk.jpg"
  },
  {
    name: "Гора Эльбрус",
    link: "images/elbrus.png"
  },
  {
    name: "Домбай",
    link: "images/dombay.png"
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

initialCards.reverse(); // меняем порядок элементов в массиве, чтоб отображалось все в нужном порядке и новые элементы вставали в начало

function likeToggle (event) {  // функция лайка
  event.target.classList.toggle("element__like_black");
}

function delitCard (event) { // функция удаления 
  event.target.closest(".element").remove();
}

 function renderElements(item) {
    const newCards = cardsTemplate.content.cloneNode(true); // клонируем элемент
    newCards.querySelector(".element__name").textContent = item.name;  // название места из массива
    newCards.querySelector(".element__foto").src = item.link; // ссылка из массива
    newCards.querySelector(".element__delete").addEventListener("click", delitCard) // для удаления
    newCards.querySelector(".element__like").addEventListener("click", likeToggle) // для лайка
    newCards.querySelector(".element__foto").addEventListener("click", popupFullScreenToggle) // для картинки на полный экран
    elementsList.prepend(newCards); // добавляем на страницу
 }

 function addElements(event) {
    event.preventDefault(); // чтоб страница не перезагружалась при отправке формы

    const newCardText = event.currentTarget.querySelector(".popup__input_type_title").value; // задаем название карточки 
    const newCardLink = event.currentTarget.querySelector(".popup__input_type_link").value; // задаем ссылку на карточку

    renderElements({ name: newCardText, link: newCardLink});
    
    event.currentTarget.reset(); // чтоб в полях не сохранялись введенные данные  
    popupCardsToggle(); //  чтоб автоматом закрывался popup после нажатия на "Создать"
 }

 contentForm.addEventListener("submit", addElements); 
 initialCards.map(renderElements);


// функция закрытия-открытия popup(редактирование профиля)
function popupProfileToggle() {
  popupProfile.classList.toggle("popup_open");
  popupName.value=profName.textContent;
  popupDescription.value=profDescription.textContent;
}

popupOpenBnt.addEventListener("click", popupProfileToggle);
popupCloseBnt.addEventListener("click", popupProfileToggle);
 
// функция закрытия-открытия popup(добавления карточек)
function popupCardsToggle() {
  popupCards.classList.toggle("popup_open");
}

popupAddOpenBnt.addEventListener("click", popupCardsToggle);
popupAddCloseBnt.addEventListener("click", popupCardsToggle);

 //функция закрытия-открытия фулскрин фотки
 function popupFullScreenToggle(event) {
  popupFullScreen.classList.toggle("popup_open");
  popuoFoto.src = event.target.src;
  popupFotoName.textContent = event.currentTarget.parentElement.querySelector(".element__name").textContent;
  popupFullScreenClose.classList.toggle(".popup__button-close-form");
}

popupFullScreenOpen.addEventListener("click", popupFullScreenToggle);
popupFullScreenClose.addEventListener("click", popupFullScreenToggle);


function formSubmitHandler(event) {
  event.preventDefault();
  profName.textContent=popupName.value;
  profDescription.textContent=popupDescription.value;
  popupProfileToggle();
}

popupProfile.addEventListener("submit", formSubmitHandler);


