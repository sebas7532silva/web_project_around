export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    // Método privado para comprobar la validez de un campo
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    }

    // Método privado para mostrar el error de un campo
    _showInputError(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if (errorElement) {
        input.classList.add(this._config.inputErrorClass);
        errorElement.textContent = input.validationMessage;;
        errorElement.classList.add(this._config.errorClass);
      } else {
        console.warn(`Error element for input #${input.id} not found.`);
      }
    }

    // Método privado para ocultar el error de un campo
    _hideInputError(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if (errorElement) {
        input.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._config.errorClass);
      }
    }

    // Método privado para habilitar o deshabilitar el botón de Submit
    _toggleSubmitButton() {
        if (this._hasInvalidInput()) {
            this._submitButton.disabled = true;
            this._submitButton.classList.add(this._config.inactiveButtonClass);
        } else {
            this._submitButton.disabled = false;
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
        }
    }

    // Método privado para comprobar si hay algún campo inválido
    _hasInvalidInput() {
        return this._inputs.some(input => !input.validity.valid);
    }

    // Método privado para agregar los controladores de los campos
    _addEventListeners() {
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleSubmitButton();
            });
        });
    }

    // Método público para habilitar la validación
    enableValidation() {
        this._addEventListeners();
        this._toggleSubmitButton();
    }
}
