const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
}

const toggleButtonState = (button, isActive, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
}

const setEventListers = (formElement, config) => {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const isFormValid = formElement.checkValidity();
  toggleButtonState(submitButton, isFormValid, config);

  Array.from(inputsList).forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      const isFormValid = formElement.checkValidity();
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(submitButton, isFormValid, config);
    })
  })
}

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach(formElement => {
    setEventListers(formElement, config)
  })
}

const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input_valid_false",
  errorClass: "error"
}

enableValidation(validationConfig);

