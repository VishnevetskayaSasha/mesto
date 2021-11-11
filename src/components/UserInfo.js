const popupProfile = document.querySelector(".popup_type_profile"); // попап редактирования профиля
const popupName = popupProfile.querySelector(".popup__input_type_name");  // форма имени
const popupDescription = popupProfile.querySelector(".popup__input_type_description"); // форма описания 

// Класс отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor ({userSelector, infoSelector}) { // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._userName = userSelector;
    this._userDescription = infoSelector;
  }

// метод возвращает объект с данными пользователя для вставки в форму при открытии попапа
  getUserInfo() {
    popupName.value = this._userName.textContent;
    popupDescription.value = this._userDescription.textContent;
  }
// метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo() {
    this._userName.textContent = popupName.value;
    this._userDescription.textContent = popupDescription.value;
  }
}