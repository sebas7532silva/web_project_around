import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(selector, handleConfirm) {
        super(selector);
        this._handleConfirm = handleConfirm; 
        this._form = this._popup.querySelector('form');
        this._submitButton = this._form.querySelector('button[type="submit"]');
        this._defaultButtonText = this._submitButton.textContent;
    }

    _renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Eliminando...";
        } else {
            this._submitButton.textContent = this._defaultButtonText;
        }
    }

    open(cardElement, cardId) {
        this._cardElement = cardElement;
        this._cardId = cardId;
        super.open();
        this._submitButton.focus();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._renderLoading(true);
            
            this._handleConfirm(this._cardElement, this._cardId)
                .then(() => {
                    this.close();
                })
                .catch((error) => {
                    console.error("Error en la confirmación:", error);
                })
                .finally(() => {
                    this._renderLoading(false);
                });
        });
    }
}
