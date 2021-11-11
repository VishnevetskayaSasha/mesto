//  класс отвечает за открытие и закрытие попапа. 
export class Popup {
  constructor (popupSelector) {
    this._popup = popupSelector; // селектор попапа.
    this._handleEscClose = this._handleEscClose.bind(this); // явная привязка
    this._closeOverlay = this._closeOverlay.bind(this); // явная привязка
  }

  // метод содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(event){
    if(event.key === "Escape"){
      this.close()
    }
  }

  // метод содержит логику закрытия попапа кликом по фону
    _closeOverlay(event) {
      if(event.target === event.currentTarget) {
        this.close();
      }
    }

// метод добавляет слушатель клика иконке закрытия попапа. 
  _setEventListeners() {
    this._popup.querySelector(".popup__button-close").addEventListener("click", () => this.close());
    this._popup.addEventListener('click', (event) => this._closeOverlay(event));
  }

  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose); 
  }

}

