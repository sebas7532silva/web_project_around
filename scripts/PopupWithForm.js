import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
      super(selector); 
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.form'); 
      this._inputList = Array.from(this._form.querySelectorAll('.form__input')); 
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
        this._handleFormSubmit(this._getInputValues()); 
        this.close();
      });
    }

    close() {
      super.close(); 
      this._form.reset(); 
    }
  }
  