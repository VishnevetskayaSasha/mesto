//  класс для попапа подтверждения удаления

import {Popup} from "./Popup.js"

export class PopupWithSubmit extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._form = document.querySelector(".popup_type_delete");
    this._buttonSubmit = this._popup.querySelector(".popup__button");
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  setFormSubmit(handler) { // подмена функции 
    this.handleFormSubmit = handler
  }

// перезаписываем родительский метод setEventListeners, добавляем обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners(); // вызываем родительский метод
    // дополним setEventListeners новой функциональностью
    this._form.addEventListener("submit", (event) => {
      event.preventDefault(); // чтоб страница не перезагружалась при отправке формы 
      this.handleFormSubmit();
    })
  }

  // отображение Сохранение на кнопке 
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

}