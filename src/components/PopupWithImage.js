import {Popup} from "./Popup.js"

const popupFullScreen = document.querySelector(".popup_type_img") // попап фулскрин фотки
const popupFoto = popupFullScreen.querySelector(".popup__foto"); // фотка  фулскрин попапа
const popupFotoName = popupFullScreen.querySelector(".popup__foto-name"); // текст фотки фулскрин попапа 

// класс переписывает родительский медод open, чтобы при открытии попапа открывалась картинка + подпись
export class PopupWithImage extends Popup {
  constructor (data, popupSelector){
    super(popupSelector) // ключевым словом super вызываем конструктор родительского класса с единственным аргументом — селектором
    this._link = data.link;
    this._name = data.name;
  }

// 
  open() {
    super.open(); // вызываем родительский метод
    popupFoto.src = this._link; // картинка
    popupFotoName.textContent = this._name;; // подпись 
    popupFoto.alt = this._name; // alt к картинке
  }
}

