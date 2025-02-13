import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
      super(selector);
      this._popupImage = this._popup.querySelector('.places__hidden-image'); 
      this._popupDescription = this._popup.querySelector('.places__hidden-description'); 
    }
  
    open({ src, alt, description }) {
      this._popupImage.src = src; 
      this._popupImage.alt = alt; 
      this._popupDescription.textContent = description; 
      super.open(); 
    }
  }
  
  