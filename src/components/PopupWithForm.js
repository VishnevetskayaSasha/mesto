import {Popup} from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor ({popupSelector, handleFormSubmit}) { // кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = popupSelector;
    this._form = this._element.querySelector(".popup__container");
    this._buttonSubmit = this._popup.querySelector(".popup__button");
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  // метод для сбора данных из всех полей
  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._element.querySelectorAll(".popup__input");
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  // перезаписываем родительский метод setEventListeners, добавляем обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners(); // вызываем родительский метод
    // дополним setEventListeners новой функциональностью
    this._form.addEventListener("submit", (event) => { 
      event.preventDefault(); // чтоб страница не перезагружалась при отправке формы 
      this._handleFormSubmit(this._getInputValues());  
    }); 
  } 

  // перезаписываем родительский метод close, при закрытии попапа форма должна сбрасываться.
  close() {
    super.close(); // вызываем родительский метод
    // дополним close новой функциональностью
    this._form.reset(); // чтоб в полях не сохранялись введенные данные  
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