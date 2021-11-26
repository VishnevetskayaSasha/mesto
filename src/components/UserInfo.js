// Класс отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor ({userSelector, infoSelector, avatarSelector}) { 
    this._userName = userSelector;
    this._userDescription = infoSelector;
    this._userAvatar = avatarSelector;
  }

// метод возвращает объект с данными пользователя для вставки в форму при открытии попапа
  getUserInfo() {
    return { 
      name: this._userName.textContent,
      about: this._userDescription.textContent,
      avatar: this._userAvatar.src
    }
  }


// метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
