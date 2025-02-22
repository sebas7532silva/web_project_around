import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
      super(selector); 
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.form'); 
      this._submitButton = this._form.querySelector(".form__save");
      this._inputList = Array.from(this._form.querySelectorAll('.form__input')); 
      this._defaultButtonText = this._submitButton.textContent;
    }

    _renderLoading(isLoading) {
      if (isLoading) {
          this._submitButton.textContent = "Guardando...";
      } else {
          this._submitButton.textContent = this._defaultButtonText;
      }
  }

  
    _getInputValues() {
      const inputValues = {};
      this._inputList.forEach((input) => {
        inputValues[input.name] = input.value; 
      });
      return inputValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (event) => {
          event.preventDefault();
          this._renderLoading(true);
          
          this._handleFormSubmit(this._getInputValues()) 
              .then(() => {
                  this.close();
              })
              .catch((error) => {
                  console.error("Error en la petición:", error);
              })
              .finally(() => {
                  this._renderLoading(false);
              });
      });
  }

    close() {
      super.close(); 
      this._form.reset(); 
    }
  }
  