import {Popup} from "./Popup.js"

// класс переписывает родительский медод open, чтобы при открытии попапа открывалась картинка + подпись
export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector); // ключевым словом super вызываем конструктор родительского класса с единственным аргументом — селектором
    this._link = this._popup.querySelector(".popup__foto");
    this._name = this._popup.querySelector(".popup__foto-name");
  }

    open(name, link) {
      super.open(); // вызываем родительский метод
      this._link.src = link; // картинка
      this._name.textContent = name; // подпись 
      this._link.alt = name; // alt к картинке 
  }
}

