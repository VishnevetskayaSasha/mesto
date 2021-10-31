class FormValidator  {
  constructor (config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
  }

  //показать ошибку
  _showError = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  //скрыть ошибку
  _hideError = (errorElement, inputElement) => {
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
  }
  
  // показать или скрыть ошибку после определения валидности
  _checkInputValidity = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      this._showError(errorElement, inputElement);
    } else {
      this._hideError(errorElement, inputElement);
    }
  }

  //очистка ошибки
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideError(inputElement, errorElement);
    });
  }

  //Сделать кнопку активной или неактивной
  _toggleButtonState = () => {
    const isFormValid = this._formElement.checkValidity();
    if (isFormValid) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = "disabled";
    }
  }

  // слушатели событий
  _setEventListeners = () => {
    Array.from(this._inputList).forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //включение валидации формы
  enableValidation = () => {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}

export {FormValidator};
