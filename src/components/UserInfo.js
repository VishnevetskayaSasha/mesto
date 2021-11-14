// Класс отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor ({userSelector, infoSelector}) { // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._userName = userSelector;
    this._userDescription = infoSelector;
  }

// метод возвращает объект с данными пользователя для вставки в форму при открытии попапа
  getUserInfo() {
    return { 
      nameInfo: this._userName.textContent,
      descriptionInfo: this._userDescription.textContent,
    }
  }
// метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(nameInfo, descriptionInfo) {
    this._userName.textContent = nameInfo;
    this._userDescription.textContent = descriptionInfo;
  }
}